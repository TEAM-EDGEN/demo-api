import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: String, required: true },
  nameOfParent: { type: String, required: true },
  nameOfInstitution:{ type: String, required: true },
  // Add student-specific fields here
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
