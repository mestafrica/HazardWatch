import express from 'express';
import { forgotPassword, resetPassword, verifyResetToken } from "../controllers/auth";



export const forgotPasswordRouter = express.Router();


forgotPasswordRouter.post('/users/forgot-password', forgotPassword);

forgotPasswordRouter.get('/users/reset-token/:id', verifyResetToken);

forgotPasswordRouter.post('/users/reset-password', resetPassword);
