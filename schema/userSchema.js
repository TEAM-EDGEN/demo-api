import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'parent', 'educational-head', 'admin'], required: true },
  progress: { type: Number, default: 0 },
  achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model('User', userSchema);
