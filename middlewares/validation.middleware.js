import { ErrorValidation } from "./errorHandler.js";
import { signUpValidationSchema } from "../schemas/validation.schemas.js";

export const validationSignUpData = (req, res, next) => {
    const {error} = signUpValidationSchema.validate(req.body);
    if (error) {
        throw new ErrorValidation(error);
    };
    next();
};