import mongoose, { Schema, Types } from "mongoose";
import IUser from "../interfaces/user";
import bcrypt from "bcrypt";
import crypto from "crypto";


const bcryptSalt = process.env.BCRYPT_SALT;


const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    reports: [{ type: Types.ObjectId, ref: 'Reports' }],
    createResetPasswordToken: {type: String},
    passwordChangedAt: {type: Date},
    passwordResetToken:{type: String},
    passwordResetTokenExpires:{type: Date}
},
    {
        timestamps: true
    })

//create an instance method
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash("password", Number(bcryptSalt));
    this.password = hash;
    next();
});

// UserSchema.createResetPasswordToken = function(){
//     const resetToken =  crypto.randomBytes(32).toString();

//     this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.passwordResetTokenExpires = Date.now() * 10 * 60 * 1000;

//     console.log(resetToken, this.passwordResetToken)

//     return resetToken;
// }


export default mongoose.model<IUser>('User', UserSchema)