import Router from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { register, login, forgotPassword, resetPassword } from '../controllers/userController.js';


const userRouter = Router();


// Authentication Routes
userRouter.post('/user/register', register);
userRouter.post('/user/login', login);
userRouter.post('/user/forgot-password', forgotPassword);
userRouter.post('/user/reset-password/:token', resetPassword);





// User Management Routes (Protected)
userRouter.get('/user/', protect, authorizeRoles('admin'), getAllUsers);
userRouter.get('/user/:id', protect, getUserById);
userRouter.post('/user/:id', protect, updateUser);
userRouter.delete('/user/:id', protect, authorizeRoles('admin'), deleteUser);

export default userRouter;
