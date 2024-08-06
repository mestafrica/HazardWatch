import mongoose, {Schema, Types } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    userName: {type: String, unique:true, required:true},
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    confirmPassword: {type: String, required:true},
    role: {type: String, default: 'user', enum: ['admin', 'user']},
    reports: [{type: Types.ObjectId, ref: 'Reports'}]
},
{
    timestamps:true
})

export default mongoose.model<IUser>('User', UserSchema)