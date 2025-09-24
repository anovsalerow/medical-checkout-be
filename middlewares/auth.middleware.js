import { verifyAccessToken } from "../utils/token.utils.js";
import {ErrorUnAuthorized, ErrorForbidden} from '../middlewares/errorHandler.js';

export const isAuthorized = (roles) => (req, res, next) => {
    const accessToken = req?.cookies?.accessToken;
    if (!accessToken) {
        return next(new ErrorUnAuthorized('No access token provided'));
    }

    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
        return next(new ErrorUnAuthorized('Invalid token'));
    }
    if (!roles.includes(decoded?.role)) {
        return next(new ErrorForbidden('Access denied'));
    }
    next();
};