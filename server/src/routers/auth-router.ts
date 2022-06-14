import { Router } from 'express';
import {
 authenticate, login, register, checkEmail,
} from '../controllers/auth-controller';
import { authMiddleWare } from '../middlewares/auth-middlewares';

const authRouter = Router();

authRouter.get('/check-email', checkEmail);
authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/authenticate', authMiddleWare, authenticate);

export default authRouter;
