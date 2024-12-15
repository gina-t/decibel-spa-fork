import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Bad request" });
    }
};
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const logoutUser = async (_req, res) => {
    // Invalidate the token or handle logout logic
    res.json({ message: "User logged out successfully" });
};
