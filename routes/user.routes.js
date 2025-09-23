import {Router} from 'express';
import { signUp, signIn } from '../controllers/user.controllers.js';
import { signUpMiddlewareArray } from '../middlewares/user.middleware.js';


const router = Router();

router.post('/register', signUpMiddlewareArray, signUp);
router.post('/login', signIn);

export default router;