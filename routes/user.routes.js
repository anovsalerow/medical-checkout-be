import {Router} from 'express';
import { signUp, signIn, signOut, renewalToken } from '../controllers/user.controllers.js';
import { signUpMiddlewareArray } from '../middlewares/user.middleware.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { ROLES } from '../roles.js';

const allRoles = Object.values(ROLES);

const router = Router();

router.post('/register', signUpMiddlewareArray, signUp);
router.post('/login', signIn);
router.post('/logout', signOut);
router.post('/renewal', renewalToken);

export default router;