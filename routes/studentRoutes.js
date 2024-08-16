import { Router } from 'express';
import { protect, authorizeRoles } from '../middlewares/auth.js';
import { getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { enrollInCourse , searchCourses, viewEnrolledCourses} from '../controllers/courseController.js';

// Create a Router
const studentRouter = Router();


// Student routes
// studentRouter.get('/students', protect, studentOnly, getStudents);
// studentRouter.get('/students/:id', protect, studentOnly, getStudentById);
// studentRouter.put('/students/:id', protect, studentOnly, updateStudent);
// studentRouter.delete('/students/:id', protect, studentOnly, deleteStudent);


// Get all students
studentRouter.get('/', protect, authorizeRoles('admin'), getStudents);

// Get a specific student by ID
studentRouter.get('/:id', protect, authorizeRoles('admin', 'educational-head', 'student'), getStudentById);

// Update a student's details
studentRouter.put('/:id', protect, authorizeRoles('admin', 'educational-head', 'student'), updateStudent);

// Delete a student
studentRouter.delete('/:id', protect, authorizeRoles('admin', 'educational-head'), deleteStudent);



// Enroll a student in a course
studentRouter.post('/:id/enroll', protect, authorizeRoles('student'), enrollInCourse);

// Search for courses
studentRouter.get('/courses/search', protect, authorizeRoles('student'), searchCourses);

// View courses a student is enrolled in
studentRouter.get('/:id/courses', protect, authorizeRoles('student'), viewEnrolledCourses);


export default studentRouter;
