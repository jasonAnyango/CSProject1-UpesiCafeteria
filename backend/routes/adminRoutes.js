import express from 'express';
import { getUsers, addUser, deleteUser } from '../controllers/adminController.js';

const router = express.Router();

// get all users
router.get('/users', getUsers);
// add a new user
router.post('/users', addUser);
// delete a user
router.delete('/users/:id', deleteUser);

export default router;