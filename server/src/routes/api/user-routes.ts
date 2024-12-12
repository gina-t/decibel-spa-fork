// defines the routes related to user registration, login, and logout
import express from 'express';
import { registerUser, loginUser, logoutUser} from '../../controllers/auth-controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export { router as userRouter };
