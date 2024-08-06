import express from 'express';
import controller from '../controllers/user';
import { extractJWT, checkAdmin } from 'middlewares/extractJWT';

const router = express.Router();

// Define routes
router.post('/users/register', controller.register);
router.post('/users/login', controller.login);
router.patch('/users/:id', controller.editUser);
router.delete('/users/:id', controller.deleteUser);
router.post('/users/logout', controller.logout);
router.get('/users/get/all', extractJWT, controller.getAllUsers);

// Export router
export default router;