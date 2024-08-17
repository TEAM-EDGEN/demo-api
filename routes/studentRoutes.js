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
studentRouter.get('/student', protect, authorizeRoles('admin'), getStudents);

// Get a specific student by ID
studentRouter.get('/student/:id', protect, authorizeRoles('admin', 'student'), getStudentById);

// Update a student's details
studentRouter.put('/student/:id', protect, authorizeRoles('admin', 'student'), updateStudent);

// Delete a student
studentRouter.delete('/student/:id', protect, authorizeRoles('admin'), deleteStudent);



// Enroll a student in a course
studentRouter.post('/student/:id/enroll', protect, authorizeRoles('student'), enrollInCourse);

// Search for courses
studentRouter.get('/student/search', protect, authorizeRoles('student'), searchCourses);

// View courses a student is enrolled in
studentRouter.get('/student/:id', protect, authorizeRoles('student'), viewEnrolledCourses);


export default studentRouter;
