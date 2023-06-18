import joi from "joi";

export const signupSchema =
{

    body:joi.object({
        userName:joi.string().alphanum().min(3).max(20).required().messages({
            'any.required':'userName is required',
            'string.empty':'userName is empty'
        }),
        email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
        password: joi.string().required(),
        cPassword:joi.string().valid(joi.ref('password')).required(),
        // age:joi.number().integer().min(20).max(80),
        // gender:joi.string().alphanum().valid('male','female').required()
    }).required(),
    query:joi.object({
        test:joi.boolean().required()
    }).required()
}

export const loginSchema =
{

    body:joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    }).required()
}