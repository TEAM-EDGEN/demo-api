import { CourseModel } from '../models/course.js';
import { InstructorModel } from '../models/instructor.js';


// Search Courses
export const searchCourses = async (req, res) => {
  try {
    const { keyword } = req.query;
    const courses = await CourseModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { instructor: { $regex: keyword, $options: 'i' } },
      ]
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Enroll in a Course
export const enrollInCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const studentId = req.user.id; 
      const student = await StudentModel.findById(studentId);
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      const course = await CourseModel.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });
  
      // Add course to student's courses if not already enrolled
      if (!student.courses.includes(courseId)) {
        student.courses.push(courseId);
        await student.save();
      }
  
      res.status(200).json({ message: 'Enrolled in course successfully', student });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  

// View Enrolled Courses
  export const viewEnrolledCourses = async (req, res) => {
    try {
      const studentId = req.user.id; 
      const student = await StudentModel.findById(studentId).populate('courses');
      if (!student) return res.status(404).json({ message: 'Student not found' });
  
      res.status(200).json(student.courses);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


//  Create a Course
export const createCourse = async (req, res) => {
  try {
    // Assuming an instructor's ID searched in the request (e.g., through authentication)
    const instructorId = req.user.id; 
    const instructor = await InstructorModel.findById(instructorId);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });

    const { name, description, subject, duration } = req.body;
    const newCourse = new CourseModel({
      name,
      description,
      subject,
      duration,
      instructor: instructorId,
    });

    const savedCourse = await newCourse.save();

    // Add course to instructor's coursesTaught array
    instructor.coursesTaught.push(savedCourse._id);
    await instructor.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



// Edit a Course
export const editCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const instructorId = req.user.id; 
      const course = await CourseModel.findOne({ _id: courseId, instructor: instructorId });
      if (!course) return res.status(404).json({ message: 'Course not found or you do not have permission to edit this course' });
  
      const updatedCourse = await CourseModel.findByIdAndUpdate(courseId, req.body, { new: true });
  
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


// View All Courses Created by an Instructor
export const getCoursesByInstructor = async (req, res) => {
    try {
      const instructorId = req.user.id; // Assuming you have the instructor's ID in the request (e.g., through authentication)
  
      const courses = await CourseModel.find({ instructor: instructorId });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


//   Delete a Course  
  export const deleteCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const instructorId = req.user.id; 
      const course = await CourseModel.findOne({ _id: courseId, instructor: instructorId });
      if (!course) return res.status(404).json({ message: 'Course not found or you do not have permission to delete this course' });
  
      await course.remove();
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };