import { Router } from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { createCourse, editCourse, deleteCourse, getCoursesByInstructor } from '../controllers/courseController.js';

const courseRouter = Router();

courseRouter.post('/course', protect, authorizeRoles('instructor'), createCourse);
courseRouter.patch('/course/:Id', protect, authorizeRoles('instructor'), editCourse);
courseRouter.delete('/course/:Id', protect, authorizeRoles('instructor'), deleteCourse);
courseRouter.get('/course', protect, authorizeRoles('instructor', 'student'), getCoursesByInstructor);

export default courseRouter;
