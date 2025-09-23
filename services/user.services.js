import bcrypt from 'bcrypt';
import { ErrorValidation } from '../middlewares/errorHandler.js';
import {
    addAndSaveNewUser, 
    getUserByEmailAndPassword
} from '../repositories/user.repositories.js';
import { createAccessToken, createRefreshToken } from '../utils/token.utils.js';
import {ROLES} from '../roles.js';


const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export const createNewUser = async ({email, password, role=ROLES.CUSTOMER}, next) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const newUser = await addAndSaveNewUser({
            email,
            password: hash,
            role
        });
        return {
            id: newUser.id,
            email: newUser.email
        };
    } catch(err) {
        return next ( new ErrorValidation(err));
    };
};

export const signInUser = async ({email, password}, next) => {
    const userInfo = await getUserByEmailAndPassword({email, password});
    if (!userInfo) {
        return next(new ErrorValidation('Incorrect email or password'));
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = createRefreshToken(userInfo);
    return {
        accessToken,
        refreshToken,
        userId: userInfo.id
    };
};