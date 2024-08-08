import joi from "joi";


export const forgotPasswordValidator = joi.object({
    name: joi.string().required()
})




