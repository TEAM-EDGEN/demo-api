import { InstructorModel } from '../models/instructor.js';

export const getInstructors = async (req, res) => {
  try {
    const instructors = await InstructorModel.find();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getInstructorById = async (req, res) => {
  try {
    const instructor = await InstructorModel.findById(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const instructor = await InstructorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
