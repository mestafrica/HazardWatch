import jwt from 'jsonwebtoken';
import IUser from '../src/models/user';
import { Token } from '../src/models/token';
import sendEmail from '../utils/emails/sendEmail';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// const JWTSecret: string = process.env.JWT_SECRET || '';
const JWTSecret: string = process.env.SERVER_TOKEN_SECRET || ''
const bcryptSalt: number = 10; // adjust the salt value as needed

interface IRequestPasswordReset {
  email: string;
}

interface IResetPassword {
  userId: string;
  token: string;
  password: string;
}

// //create account for new user
// export const signup = async (data: any): Promise<{ userId: string; email: string; name: string; token: string }> => {
//   let user = await IUser.findOne({ email: data.email });
//   if (user) {
//     throw new Error('Email already exists');
//   }

//   user = new IUser(data);
//   const token: string = jwt.sign({ id: user._id }, JWTSecret);

//   await user.save();

//   return(data = {
//     userId: user._id,
//     email: user.email,
//     name: user.userName,
//     token:token,
//   });
// };



//set up the password reset request
export const requestPasswordReset = async ({ email }: IRequestPasswordReset): Promise<string> => {
  const user = await IUser.findOne({ email });

  if (!user) {
    throw new Error('User does not exist');
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }



//generate random token
  const resetToken: string = crypto.randomBytes(32).toString('hex');

  //create a hash of the token 
  const hash: string = await bcrypt.hash(resetToken, bcryptSalt);

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();



  //reset password link contains the token and userId which will be used to verify the user's identity before reseting the password
  const link: string = `${process.env.SERVER_PORT || 1337}/passwordReset?token=${resetToken}&id=${user._id}`;
  sendEmail(user.email, 'Password Reset Request', { name: user.userName, link }, './template/requestResetPassword.handlebars');
  return link;
};


//send back the token,new password, and userId
export const resetPassword = async ({ userId, token, password }: IResetPassword): Promise<boolean> => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error('Invalid or expired password reset token');
  }


  //compare the token the server received with the hashed version in the database
  const isValid: boolean = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error('Invalid or expired password reset token');
  }


  //hash the new password
  const hash: string = await bcrypt.hash(password, bcryptSalt);

  //update user account with the new password
  await IUser.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });

  const user = await IUser.findById(userId);
  sendEmail(
    userId.email,
    'Password Reset Successfully',
    {
      name: user.userName,
    },
    './template/resetPassword.handlebars'
  );

  await passwordResetToken.deleteOne();
  return true;
};
