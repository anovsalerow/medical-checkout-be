import bcrypt from 'bcrypt';
import { ErrorValidation } from '../middlewares/errorHandler.js';
import {ROLES} from '../roles.js';


const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

export const createNewUser = async ({email, password, role=ROLES.CUSTOMER}, next) => {
    try {
        const hash = await bcrypt(password, saltRounds);
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
        next(new ErrorValidation(err));
    };
};