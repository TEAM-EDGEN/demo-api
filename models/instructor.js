import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const instructorSchema = new Schema({
  expertise: { type: String, required: true },
  coursesTaught: [{ type: Types.ObjectId, ref: 'Course' }],
  nameOfInstitution: { type: String, required: true },
  // Array of subjects that the instructor teaches
  subjectsTaught: [{ type: String, required: true }],
  yearsOfExperience: { type: Number, required: true }
}, {
  timestamps: true
});


instructorSchema.plugin(toJSON)

export const instructorModel = model('Instructor', instructorSchema);