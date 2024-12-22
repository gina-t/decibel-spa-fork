import { Request, Response } from "express";
import { User } from "../models/User.js";

// GET http://localhost:3001/api/user/
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    console.log(users);
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET http://localhost:3001/api/user/:userId
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST http://localhost:3001/api/user/
export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log('Received Request Body:', req.body);

  if (!username || !email || !password) {
    console.log('Validation Error: Missing fileds');
    res.status(400).json({ error: 'All fields are required' });
  } else {
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
      } else {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      user.username = username;
      user.email = email; 
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
