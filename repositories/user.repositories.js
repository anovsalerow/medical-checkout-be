import {User} from '../models/user.js';

export const addAndSaveNewUser = async (newUser) => {
    return await new User(newUser).save();
};

export const getUserByEmail = async(email) => {
    return User.findOne(
        {email}, 
        {
            email: 1, 
            role: 1, 
            refreshToken: 1
        }
    );
};