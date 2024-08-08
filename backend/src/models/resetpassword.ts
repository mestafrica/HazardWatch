import mongoose, { Document, Model, Schema } from 'mongoose';
import IResetPassword from 'interfaces/resetpassword';


const resetPasswordSchema: Schema<IResetPassword> = new Schema({
  resetToken: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(this: IResetPassword, value: string) {
        return value === this.password;
      },
      message: 'Confirm password must match password'
    }
  }
});

export default mongoose.model<IResetPassword>('ResetPassword', resetPasswordSchema);