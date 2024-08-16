import { Schema, model } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const courseSchema = new Schema({
  title: { type: String, required: true },
  gradeLevel: { type: String,  },
  description: { type: String },
  difficulty: { type: Number, required: true },
  content: { type: String },
});

courseSchema.plugin(toJSON);
export const CourseModel = model('Course', courseSchema);
