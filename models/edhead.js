import mongoose from 'mongoose';

const educationalHeadSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add educational head-specific fields here
});

const EducationalHead = mongoose.model('EducationalHead', educationalHeadSchema);
export default EducationalHead;
