import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, email });
    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Bad request' });
  }
};

// PUT /Users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.email = email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
