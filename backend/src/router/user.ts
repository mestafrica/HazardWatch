import express from 'express';
import { register, login, createUser, editUser, deleteUser, logout, getAllUsers } from '../controllers/user';
import { checkAuth, hasPermission } from '../middlewares/auth';

const router = express.Router();

// Define routes
router.post('/register', register);  // Ensure this route matches your request URL
router.post('/login', login);
router.patch('/', checkAuth, hasPermission('create_user'), createUser);
router.patch('/:id', checkAuth, hasPermission('update_user'), editUser);
router.delete('/:id', checkAuth, hasPermission('delete_user'), deleteUser);
router.post('/logout', checkAuth, logout);
router.get('/', checkAuth, hasPermission('read_users'), getAllUsers);

export default router;
