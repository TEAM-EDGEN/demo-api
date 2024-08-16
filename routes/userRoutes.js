import Router from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { register, login, forgotPassword, resetPassword } from '../controllers/userController.js';


const userRouter = Router();


// Authentication Routes
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);





// User Management Routes (Protected)
userRouter.get('/', protect, authorizeRoles('admin'), getAllUsers);
userRouter.get('/:id', protect, getUserById);
userRouter.post('/:id', protect, updateUser);
userRouter.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

export default userRouter;
