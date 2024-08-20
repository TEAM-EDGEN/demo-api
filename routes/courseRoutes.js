import { Router } from 'express';
import { verifyUser, instructorOnly, studentOnly } from '../middlewares/auth.js';
import { createCourse, editCourse, deleteCourse, getCoursesByInstructor } from '../controllers/courseController.js';

const courseRouter = Router();

courseRouter.post('/course', createCourse);
    // verifyUser, instructorOnly, 
courseRouter.patch('/course/:Id',verifyUser, instructorOnly, editCourse);
courseRouter.delete('/course/:Id',verifyUser, instructorOnly, deleteCourse);
courseRouter.get('/course', verifyUser, instructorOnly, studentOnly, getCoursesByInstructor);

export default courseRouter;
