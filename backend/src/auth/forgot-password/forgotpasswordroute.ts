//import database
// import config from "config/config";
import { connectToMongoDB } from "auth/forgot-password/mongodb";
import { NextResponse } from "next/server";
//import user from user model
import { UserModel } from "db/users";
import ForgotPasswordToken from "models/ForgotPasswordToken";
import { BASE_URL } from "index";
import { Resend } from 'resend';



const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {

        //connect to DB
        connectToMongoDB().catch(err => NextResponse.json(err))

        //find the user with email
        const { email } = await req.json()
        const user = await UserModel.findOne({ email })

        if (!user)
            return NextResponse.json({ success: false, error: "User with this email does not exist" }, { status: 404 })

        //otherwise create a reset token which is random and unique
        const resetToken = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, '')


        //save the reset token
        const tokenRes = await ForgotPasswordToken.create({
            //pass id of user found by email
            userId: user._id,
            token: resetToken,
            resetAt: null
        })
        //send reset password link in email
        const resetPasswordLink = `${BASE_URL}/reset-password/${tokenRes.token}`

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Forgot Password',
            react: ({ name: user.userName, resetLink: resetPasswordLink }),
        });

        return NextResponse.json({
            success: true,
            msg: 'Please follow instructions to reset password. If email is not received please check spam folder'
        })
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 520 });
    }
};



