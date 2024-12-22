import express from "express";
import {getUsers, getUserById, createUser, updateUser, deleteUser } from "../../controllers/user-controller.js";

const router = express.Router();

// Get all users
router.get('/', getUsers);

// GET a single user by id
router.get('/:userId', getUserById);

// Post a new user
router.post('/', createUser);

// PUT to update a user by id
router.put('/:userId', updateUser);

// DELETE to remove user by id
router.delete('/:userId', deleteUser);

export default router;
