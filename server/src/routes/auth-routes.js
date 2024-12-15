import { Router } from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body; // Extract username and password from request body
    // Find the user in the database by username
    const user = await User.findOne({
        where: { username },
    });
    // If user is not found, send an authentication failed response
    if (!user) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user.password);
    // If password is invalid, send an authentication failed response
    if (!passwordIsValid) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    // Get the secret key from environment variables
    const secretKey = process.env.JWT_SECRET_KEY || "";
    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    return res.json({ token }); // Send the token as a JSON response
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export { router as authRoutes };
// const authRouter = Router();
// // Route for user registration
// authRouter.post('/register', registerUser);
// // Route for user login
// authRouter.post('/login', loginUser);
// // Route for user logout (protected route)
// authRouter.post('/logout', authenticateToken, logoutUser);
// export { authRouter };
