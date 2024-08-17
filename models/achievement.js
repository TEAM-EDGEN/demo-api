import { Schema, model } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const achievementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  dateAchieved: { type: Date, default: Date.now },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
},{
  timestamps: true
});

achievementSchema.plugin(toJSON);

export const  AchievementModel = model('Achievement', achievementSchema);
