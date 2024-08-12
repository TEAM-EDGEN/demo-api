import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add instructor-specific fields here
});

const Instructor = mongoose.model('Instructor', instructorSchema);
export default Instructor;
