import mongoose, { model, models, Schema, Types } from "mongoose";
import IUser from "../interfaces/user";
import { hash } from "bcryptjs";
import { request } from "express";




const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    reports: [{ type: Types.ObjectId, ref: 'Reports' }]
},
    {
        timestamps: true
    })

//hash password before saving with mongoose pre save hook
UserSchema.pre('save', async function (next) {
    //if password is not different move to next middleware in the chain
    if (!this.isModified("password")) {
        return next()
    }

    //otherwise save hash password
    this.password = await hash(request.body.password, 10)
})

//use existing model or create a newone
//This is checking if a User property exists in the models object. If it does, the expression will return the value of models.User
export const User = models.User || model("User", UserSchema);



export default mongoose.model<IUser>('User', UserSchema);