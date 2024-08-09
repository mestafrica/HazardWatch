import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'user';
  reports: mongoose.Types.ObjectId[];
  hazardreport: mongoose.Types.ObjectId[];
}

export default IUser;
