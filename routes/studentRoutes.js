import { Router } from 'express';
import { protect, studentOnly } from '../middlewares/auth.js';
import { getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';


// Create a Router
const studentRouter = Router();


// Student routes
studentRouter.get('/students', protect, studentOnly, getStudents);
studentRouter.get('/students/:id', protect, studentOnly, getStudentById);
studentRouter.put('/students/:id', protect, studentOnly, updateStudent);
studentRouter.delete('/students/:id', protect, studentOnly, deleteStudent);


export default studentRouter;
