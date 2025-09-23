import jwt from 'jsonwebtoken';
import { tokenConfig } from '../config/token.config.js';

const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, {expiresIn});
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

export const createAccessToken = (payload) => {
    return generateToken(payload, tokenConfig.access.secret, tokenConfig.access.expiresIn);
};

export const createRefreshToken = (payload) => {
    return generateToken(payload, tokenConfig.refresh.secret, tokenConfig.refresh.epiresIn);
};

export const verifyAccessToken = (accessToken) => {
    return verifyToken(accessToken, tokenConfig.access.secret);
};
export const verifyRefreshToken = (refreshToken) => {
    return verifyToken(refreshToken, tokenConfig.refresh.secret);
};