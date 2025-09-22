import bcrypt from 'bcrypt';
import { ErrorValidation } from '../middlewares/errorHandler.js';
import {addAndSaveNewUser} from '../repositories/user.repositories.js';
import {ROLES} from '../roles.js';


const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export const createNewUser = async ({email, password, role=ROLES.CUSTOMER}) => {
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
        throw new ErrorValidation(err);
    };
};