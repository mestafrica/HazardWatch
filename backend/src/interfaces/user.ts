import { Document, Types } from 'mongoose';

export default interface IUser extends Document{
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    reports: Types.ObjectId[];
}