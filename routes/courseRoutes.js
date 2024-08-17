import { Router } from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { createCourse, editCourse, deleteCourse, getCoursesByInstructor } from '../controllers/courseController.js';

const courseRouter = Router();

courseRouter.post('/create', protect, authorizeRoles('instructor'), createCourse);
courseRouter.put('/:courseId/edit', protect, authorizeRoles('instructor'), editCourse);
courseRouter.delete('/:courseId/delete', protect, authorizeRoles('instructor'), deleteCourse);
courseRouter.get('/my-courses', protect, authorizeRoles('instructor'), getCoursesByInstructor);

export default courseRouter;
