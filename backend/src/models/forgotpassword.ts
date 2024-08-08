import mongoose,{Schema} from 'mongoose';


import IForgotPassword from 'interfaces/forgotpassword';

const forgotPasswordSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});

export default mongoose.model<IForgotPassword>('ForgotPassword', forgotPasswordSchema);