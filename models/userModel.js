import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';
import bcrypt from 'bcrypt';



const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Parent', 'Instructor', 'Educational_head'], default: 'Student' },
  profile: { 
    type: Types.ObjectId, 
    refPath: 'role' 
    // Dynamically reference either 'Student' or 'Instructor' schema based on role
  },
  resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
}, {
  timestamps: true
});


//reset token model 
const resetTokenSchema = new Schema({
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  expired: { type: Boolean, default: false },
  expiredAt: {
    type: Date,
    default: () => new Date().setHours(new Date().getHours() + 2)
  }

}, {
  timestamps: true
})


userSchema.plugin(toJSON)

export const resetTokenModel = model('resetToken', resetTokenSchema);
export const UserModel = model('User', userSchema);
