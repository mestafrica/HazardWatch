import { signup, requestPasswordReset, resetPassword } from "../services/auth.service"



// export const signUpController = async (req:any, res:any, next:any) => {
//     try {
//         const signupService = await signup(req.body);
//         return res.json(signupService);
//     } catch (error) {
//         next(error);
//     }
// };


export const resetPasswordRequestController = async (req:any, res:any, next:any) => {
   try {
     const requestPasswordResetService = await requestPasswordReset(
         req.body.email
     );
     return res.json(requestPasswordResetService);
   } catch (error) {
    next(error)
    
   }
};



export const resetPasswordController = async (req:any, res:any, next:any) => {
try {
        const resetPasswordService = await resetPassword(
            req.body.userId,
            req.body.token,
            req.body.password
        );
        return res.json(resetPasswordService);
} catch (error) {
    next(error);
}
};

