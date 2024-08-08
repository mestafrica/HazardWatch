import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import IUser from '../models/user';
import { Token } from '../models/token';
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


//set up the password reset request      //Get user based on posted email
export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction, { email }: IRequestPasswordReset): Promise<any> => {
  const user = await IUser.findOne({ email });

  //if user does not exist exist,pass error
  if (!user) {
    throw new Error('User does not exist');
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }


  //generate random plain reset token to be sent to user //specify size 32* and type hex*
  const resetToken: string = crypto.randomBytes(32).toString('hex');

  //create a hash of the token 
  const hash: string = await bcrypt.hash(resetToken, bcryptSalt);

  //save the id,token and time created in the database.
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now() * 10 * 60 * 1000,  //expires in 10mins
  }).save();


  //Send the token back to the user's email
  //reset password link contains the token and userId which will be used to verify the user's identity before reseting the password
  const resetUrl = `$(req.protocol)://$(req.get('host))/api/v1/users/resetPassword/${resetToken}`
  const message = 'We have received the password request.Please use the link below to reset your password.\n\n${resetUrl}\n\nThis reset password will be valid for only 10 minutes.'

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password change received',
      message: message,
    });


    return res.status(200).json({
      status: 'success',
      message: 'password reset link sent to the user'
    });

  } catch (error) {
    user.save({ validateBeforeSave: false })

    new Error('There was an error sending password.Please try again later')
  }

};




//send back the token,new password, and userId
export const resetPassword = async ({ userId, token, password }: IResetPassword): Promise<boolean> => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error('Invalid or expired password reset token');
  };



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

  if (user) {
    await sendEmail({
      email: user.email,
      subject: 'Password change received',
      message: "Kindly use the link to change your password.",
    });
  } else {
    throw new Error('User not found');
  }

  await passwordResetToken.deleteOne();
  return true;
};

