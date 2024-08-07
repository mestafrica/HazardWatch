import { resetPasswordController, resetPasswordRequestController } from "controllers/auth.controller";
import { Router } from "express";



export const forgotpasswordRouter = Router();


forgotpasswordRouter.post('users/forgotpassword', resetPasswordRequestController);

forgotpasswordRouter.patch('users/resetpassword/:token', resetPasswordController);

