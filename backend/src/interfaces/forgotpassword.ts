import { Document } from 'mongoose';

export default interface IForgotPassword extends Document{
    email:string;
}