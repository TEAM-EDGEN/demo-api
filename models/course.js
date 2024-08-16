import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
  title: { type: String, required: true },
  gradeLevel: { type: String,  },
  description: { type: String },
  difficulty: { type: Number, required: true },
  content: { type: String },
});

export default model('Course', courseSchema);
