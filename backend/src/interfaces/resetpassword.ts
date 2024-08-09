import { Document } from 'mongoose';

export default interface IResetPassword extends Document{
    userId:string;
    resetToken: string;
    password: string;
    confirmPassword: string;
}