import express from 'express';
import controller from '../controllers/user';
import auth from '../middlewares/auth';

const { checkAuth, hasPermission } = auth;

const router = express.Router();

// Define routes
router.post('/users/register', controller.register);
router.post('/users/login', controller.login);
router.patch('/users/:id', checkAuth, hasPermission('update)_user'), controller.editUser);
router.delete('/users/:id', checkAuth, hasPermission('delete_user'), controller.deleteUser);
router.post('/users/logout', checkAuth, controller.logout);
router.get('/users/get/all', checkAuth, hasPermission('read_users'), controller.getAllUsers);

// Export router
export default router;