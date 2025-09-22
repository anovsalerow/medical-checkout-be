import {User} from '../models/user.js';

export const addAndSaveNewUser = async (newUser) => {
    return await new User(newUser).save();
};