import { Router } from 'express';
import { userRouter } from './api/user-routes';
import { authRouter } from './auth-routes';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use('/users', authenticateToken, userRouter);
router.use('/auth', authRouter);

export default router;