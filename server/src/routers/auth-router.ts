import { Router } from 'express';
import { authenticate, login, register } from '../controllers/auth-controller';
import { authMiddleWare } from '../middlewares/auth-middlewares';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/authenticate', authMiddleWare, authenticate);

export default authRouter;
