import mongoose from 'mongoose';

interface IAuthentication {
    password: string;
    salt?: string;
    sessionToken?: string;
}

interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role: 'admin' | 'user';
    hazardreport: mongoose.Types.ObjectId[];
    authentication: IAuthentication;
}

export default IUser;
