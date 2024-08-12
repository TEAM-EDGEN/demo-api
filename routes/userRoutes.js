import express from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { register, login, forgotPassword, resetPassword } from '../controllers/userController.js';


const userRouter = express.Router();



userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);





// Admin routes
userRouter.get('/admin/users', protect, authorizeRoles('admin'), getAllUsers);
userRouter.get('/admin/users/:id', protect, authorizeRoles('admin'), getUserById);
userRouter.put('/admin/users/:id', protect, authorizeRoles('admin'), updateUser);
userRouter.delete('/admin/users/:id', protect, authorizeRoles('admin'), deleteUser);

export default userRouter;
