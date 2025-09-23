import bcrypt from 'bcrypt';
import { ErrorValidation } from '../middlewares/errorHandler.js';
import {
    addAndSaveNewUser, 
    getUserByEmailAndPassword,
    getStoredRefreshToken,
    removeRefreshToken
} from '../repositories/user.repositories.js';
import { 
    createAccessToken, 
    createRefreshToken, 
    verifyAccessToken, 
    verifyRefreshToken 
} from '../utils/token.utils.js';
import {ROLES} from '../roles.js';


const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

export const createNewUser = async ({email, password, role=ROLES.CUSTOMER}, next) => {
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
        return next ( new ErrorValidation(err));
    };
};

export const signInUser = async ({email, password}, next) => {
    const userInfo = await getUserByEmailAndPassword({email, password});
    if (!userInfo) {
        return next(new ErrorValidation('Incorrect email or password'));
    };
    const accessToken = createAccessToken(userInfo);
    const refreshToken = createRefreshToken(userInfo);
    return {
        accessToken,
        refreshToken,
        userId: userInfo.id
    };
};

export const getUserId = (req) => {
    const cookies = req.cookies;
    if (!cookies?.accessToken) {
        return null;
    }
    const decodedToken = verifyAccessToken(cookies.accessToken);
    return decodedToken ? decodedToken.id : null;
};

export const getToken = (req) => {
    const {accessToken, refreshToken} = req?.cookies;
    if (!accessToken) {
        throw new ErrorUnauthorized('No accessToken provided');
    }
    if (!refreshToken) {
        throw new ErrorUnauthorized('No refreshToken provided');
    }
    return {accessToken, refreshToken};
};

export const updateTokens = async (req) => {
    const currentUser = getUserId(req);
    const {refreshToken} = getToken(req);
    const storedRefreshToken = currentUser ? await getStoredRefreshToken(currentUser) : null;
    let newAccessToken = null;
    let newRefreshToken = null;

    if (refreshToken !== storedRefreshToken) {
        throw new ErrorForbidden('Invalid refresh token');
    }

    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
        removeRefreshToken(currentUser);
        throw new ErrorForbidden('Invalid refresh token');
    }
    const payload = { 
        role: decoded.role,
        id: decoded.id
    };
    newAccessToken = createAccessToken(payload);
    newRefreshToken = createRefreshToken(payload);

    return {
        newAccessToken,
        newRefreshToken,
        userId: currentUser
    };
};