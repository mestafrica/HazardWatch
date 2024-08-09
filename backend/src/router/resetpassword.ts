import express from 'express';
import { forgotPassword, resetPassword } from "../controllers/auth";



const router = express.Router();


router.post('users/forgotpassword', forgotPassword);

router.patch('users/resetpassword/:token', resetPassword);
