import { Router } from 'express';
import { protect, instructorOnly } from '../middlewares/auth.js';
import { getInstructors, getInstructorById, updateInstructor, deleteInstructor} from '../controllers/instructorController.js';


// Create a Router
const instructorRouter = Router();


// Instructor routes
instructorRouter.get('/instructors', protect, instructorOnly, getInstructors);
instructorRouter.get('/instructors/:id', protect, instructorOnly, getInstructorById);
instructorRouter.put('/instructors/:id', protect, instructorOnly, updateInstructor);
instructorRouter.delete('/instructors/:id', protect, instructorOnly, deleteInstructor);


export default instructorRouter;
