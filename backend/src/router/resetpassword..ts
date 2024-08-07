import { resetPasswordController, resetPasswordRequestController } from "controllers/auth.controller";
import { Router } from "express";



export const resetPassRouter = Router();


resetPassRouter.post('users/resetpassword', resetPasswordRequestController);

resetPassRouter.post('users/resetpassword', resetPasswordController);

