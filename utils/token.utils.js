import jwt from 'jsonwebtoken';
import { tokenConfig } from '../config/token.config.js';

const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, {expiresIn});
};

export const createAccessToken = (payload) => {
    return generateToken(payload, tokenConfig.access.secret, tokenConfig.access.expiresIn);
};

export const createRefreshToken = (payload) => {
    return generateToken(payload, tokenConfig.refresh.secret, tokenConfig.refresh.epiresIn);
};