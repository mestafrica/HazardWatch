import { Document, Types } from 'mongoose';

export default interface IUser extends Document{
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    reports: Types.ObjectId[];
}