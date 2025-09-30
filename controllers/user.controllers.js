import { createNewUser, signInUser, getUserId, updateTokens } from "../services/user.services.js";
import {saveRefreshToken, removeRefreshToken, getUser} from '../repositories/user.repositories.js';
import { cookieConfig } from "../config/cookie.config.js";

const sendAuthResponse = (res, userId, accessToken, refreshToken) => {
    res.cookie(
        'accessToken',
        accessToken,
        cookieConfig.access
    );
    res.cookie(
        'refreshToken',
        refreshToken,
        cookieConfig.refresh
    );
    return res.status(200).json({ user: {id: userId }})
};

export const signUp = async (req, res, next) => {
    try {
        await createNewUser(req.body, next);
        const {accessToken, refreshToken, userId} = await signInUser(req.body, next);
        await saveRefreshToken(userId, refreshToken);
        return sendAuthResponse(res, userId, accessToken, refreshToken);
    } catch (err) {
        next(err);
    };
};

export const signIn = async (req, res, next) => {
    try {
        const {accessToken, refreshToken, userId} = await signInUser(req.body, next);
        await saveRefreshToken(userId, refreshToken);
        return sendAuthResponse(res, userId, accessToken, refreshToken);
    } catch (err) {
        return next(err);
    }
};

export const signOut = async (req, res) => {
    const currentUserId = getUserId(req);
    if (!!currentUserId) {
        await removeRefreshToken(currentUserId);
    }
    res.clearCookie(
        'accessToken', 
        {httpOnly: true,
        sameSite: "None",
        secure: true
        });
    res.clearCookie(
        'refreshToken', 
        {httpOnly: true,
        sameSite: "None",
        secure: true
        });
    res.status(200).send('OK');
};

export const renewalToken = async (req, res, next) => {
    try {
        const {newAccessToken, newRefreshToken, userId} = await updateTokens(req);
        await saveRefreshToken(userId, newRefreshToken);
        res.cookie('accessToken', newAccessToken, cookieConfig.access);
        res.cookie('refreshToken', newRefreshToken, cookieConfig.refresh);

        res.status(200).json({ user: {id: userId }});
    } catch (err) {
        next(err);
    }
};

export const checkAuth = async (req, res) => {
    res.status(200).json({ user: {id: getUserId(req) }});
};