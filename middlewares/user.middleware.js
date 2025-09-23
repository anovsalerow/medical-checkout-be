import { ErrorUserAlreadyExist } from "./errorHandler.js";
import { validationSignUpData } from "./validation.middleware.js";
import { getUserByEmail } from "../repositories/user.repositories.js";

export const isUserAlreadyExist = async (req, res, next) => {
    const {email} = req.body;
    const isFoundUser = await getUserByEmail(email);
    if (isFoundUser) {
        return next(new ErrorUserAlreadyExist('User already exist'));
    };
    next();
};

export const signUpMiddlewareArray = [validationSignUpData, isUserAlreadyExist];