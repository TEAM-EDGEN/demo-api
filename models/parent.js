import mongoose from 'mongoose';

const parentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add parent-specific fields here
});

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;
