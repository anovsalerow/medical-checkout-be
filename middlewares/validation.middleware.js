import { ErrorValidation } from "./errorHandler";
import { signUpValidationSchema } from "../schemas/validation.schemas";

export const validationSignUpData = (req, res, next) => {
    const {error} = signUpValidationSchema.validate(req.body);
    if (error) {
        throw new ErrorValidation(error);
    };
    next();
};