import { verifyAccessToken } from "../utils/token.utils.js";

export const isAuthorized = (roles) => (req, res, next) => {
    const accessToken = req?.cookies?.accessToken;
    if (!accessToken) {
        return next(new ErrorUnauthorized('No token provided'));
    }
    
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
        return next(new ErrorUnauthorized('Invalid token'));
    }
    if (!roles.includes(decoded?.role)) {
        return next(new ErrorForbidden('Access denied'));
    }
    next();
};