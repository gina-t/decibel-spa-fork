import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth-controller';
import { authenticateToken } from '../middleware/auth';

const authRouter = Router();

// Route for user registration
authRouter.post('/register', registerUser);

// Route for user login
authRouter.post('/login', loginUser);

// Route for user logout (protected route)
authRouter.post('/logout', authenticateToken, logoutUser);

export { authRouter };