import { Schema, model } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';


const badgeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
},{ 
  timestamps: true
});


badgeSchema.plugin(toJSON);

export const BadgeModel =  model('Badge', badgeSchema);
