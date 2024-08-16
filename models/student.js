import { Schema, Types, model } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const studentSchema = new Schema({
  age: { type: Number, required: true },
  gradeLevel: { type: String },
  // Array of strings to support multiple Parent
  nameOfParent: [{ type: String, required: true }],
  nameOfInstitution: { type: String, required: true },
  // Array of strings to support multiple courses
  courses: [{ type: String }],
  progress: { type: Number, default: 0 },
  achievements: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
  badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
  leaderboard: [{ type: Schema.Types.ObjectId, ref: 'Leaderboard' }],
}, {
  timestamps: true
});


studentSchema.plugin(toJSON);

export const StudentModel = model('Student', studentSchema);
