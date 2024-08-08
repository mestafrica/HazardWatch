import mongoose, { Schema, Types } from "mongoose";
import IUser from "../interfaces/user";
import bcrypt from "bcrypt";


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

export default mongoose.model<IUser>('User', UserSchema)