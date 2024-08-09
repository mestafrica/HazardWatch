import mongoose, { Schema, Document, Types } from "mongoose";
import IUser from "../interfaces/user";

// Define schema for authentication
const AuthenticationSchema: Schema = new Schema({
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
});

// Define user schema
const UserSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['admin', 'user'] },
    hazardreport: [{ type: Types.ObjectId, ref: 'HazardReport' }],
    authentication: AuthenticationSchema,
}, {
    timestamps: true
});

// Create model only if it doesn't already exist
const UserModel = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>('User', UserSchema);

export { UserModel };
