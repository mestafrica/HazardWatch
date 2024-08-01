import { connectToMongoDB } from "auth/forgot-password/mongodb";
import ForgotPasswordToken from "models/ForgotPasswordToken";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "db/users";
import mongoose from "mongoose";
import { startSession } from "mongoose";



export async function POST(req: NextRequest) {

    let session;
    try {
        const { password, resetToken } = await req.json();

        //connect to database
        await connectToMongoDB();

        const passResetToken = await ForgotPasswordToken.findOne({
            //find on the basis of three things
            token: resetToken,
            //if the link sent has not been used to change the password yet
            resetAt: null,
            //check if token is expired  //provide the date 2hrs before the current date
            createdAt: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 2) }
        })

        //if not reset password
        if (!passResetToken) {
            return NextResponse.json({ success: false, error: "Either this link is expired or it's invalid" }, { status: 401 })
        }

        //update resetAt so that user cannot use the same link multiple times
        //update passwaord:we make this transaction so that if one of them fails, we dont want to undo both.
        session = await startSession();
        session.startTransaction();

        passResetToken.resetAt = new Date();
        await passResetToken.save({ session });

        const user = await UserModel.findById(passResetToken.userId);

        //update the password
        user?.authentication?.password? = password
        await user.save({session});

        //commit transaction
        await session.commitTransaction();
        session.endSession();

        return NextResponse.json({
            success: true,
            msg: "password updated successfully"
        })

    } catch (error) {
        //if error abort the transaction
        session?.abortTransaction();

        //if it is a validation error,import mongoose, get error message and return it
        if (error instanceof mongoose.Error.ValidationError) {
            for (let field in error.errors) {
                const msg = error.errors[field].message
                return NextResponse.json({ success: false, error: msg }, { status: 403 });
            }
        }
        return NextResponse.json({ success: false, error }, { status: 520 });
    }
}