import { createNewUser, signInUser } from "../services/user.services.js";
import {saveRefreshToken} from '../repositories/user.repositories.js';

export const signUp = async (req, res, next) => {
    const newUser = await createNewUser(req.body, next);

    return res.status(201).json(newUser);
};

export const signIn = async (req, res, next) => {
    try {
        const {accessToken, refreshToken, userId} = await signInUser(req.body, next);
        await saveRefreshToken(userId, refreshToken);
        console.log('accessToken')
        res.cookie(
            'accessToken',
            accessToken,
            {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            }
        );
        console.log('refreshToken')
        res.cookie(
            'refreshToken',
            refreshToken,
            {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            }
        );
        res.status(200).send('OK');
        console.log('ok')
    } catch (err) {
        return next(err);
    }
};