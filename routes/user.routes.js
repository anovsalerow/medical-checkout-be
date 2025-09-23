import {Router} from 'express';
import { signUp } from '../controllers/user.controllers.js';
import { signUpMiddlewareArray } from '../middlewares/user.middleware.js';


const router = Router();

router.post('/register', signUpMiddlewareArray, signUp);

export default router;