import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { authenticateToken } from '../middleware/auth.js';


const router = Router();

router.use('/users', userRouter);
router.use('/api', authenticateToken, router);

export default router;