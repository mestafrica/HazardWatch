import { POST } from "auth/forgot-password/forgotpasswordroute";
import express  from "express";



const recoveryRouter = express.Router();


recoveryRouter.post('/users/forgotPassword', POST);
recoveryRouter.post('/users/resetPassword', POST);


export default recoveryRouter;