import joi from "joi";


export const resetPasswordValidator = joi.object({
    resetToken: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
});