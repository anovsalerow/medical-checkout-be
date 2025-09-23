import Joi from 'joi';

export const signUpValidationSchema = Joi.object({
    email: Joi.string()
        .max(254)
        .pattern(new RegExp(/^(([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,}))/, "iu"))
        .required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]/))
        .required()
});