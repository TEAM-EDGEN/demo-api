import joi from 'joi';


// User Joi Schema
// export const userSchema = joi.object({
//   firstName: joi.string().required(),
//   lastName: joi.string().required(),
//   userName: joi.string().required(),
//   email: joi.string().email().required(),
//   password: joi.string().required(),
//   role: joi.string().valid('Student', 'Parent', 'Instructor', 'Educational_head').default('Student'),
//   // ObjectId as string
//   student: joi.array().items(joi.string().hex().length(24)), 
//     // ObjectId as string
//   instructor: joi.array().items(joi.string().hex().length(24)), 
//   resetPasswordToken: joi.string().optional(),
//   resetPasswordExpires: joi.date().optional(),
// });


// Student Joi Schema
export const studentSchema = joi.object({
  age: joi.number().required(),
  gradeLevel: joi.string().optional(),
  nameOfParent: joi.array().items(joi.string().required()),
  nameOfInstitution: joi.string().required(),
  courses: joi.array().items(joi.string()).optional(),
  progress: joi.number().default(0),
  achievements: joi.array().items(joi.string().hex().length(24)), 
  badges: joi.array().items(joi.string().hex().length(24)), 
  leaderboard: joi.array().items(joi.string().hex().length(24)), 
});



// Instructor Joi Schema
export const instructorSchema = joi.object({
  expertise: joi.string().required(),
  coursesTaught: joi.array().items(joi.string().hex().length(24)), 
  nameOfInstitution: joi.string().required(),
  subjectsTaught: joi.array().items(joi.string().required()),
  yearsOfExperience: joi.number().required(),
});

// Achievement joi Schema
export const achievementSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().optional(),
  dateAchieved: joi.date().default(Date.now),
  student: joi.string().hex().length(24).required(),
});

// Badge joi Schema
export const badgeSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().optional(),
  icon: joi.string().optional(),
  student: joi.string().hex().length(24).required(),
});

// Leaderboard joi Schema
export const leaderboardSchema = joi.object({
  student: joi.string().hex().length(24).required(),
  score: joi.number().required(),
});


// course Joi Schema
export const courseSchema = joi.object({
  title: joi.string().required(),
  gradeLevel: joi.string().optional(),
  description: joi.string().optional(),
  difficulty: joi.number().required(),
  content: joi.string().optional(),
});


// Registration Joi Schema
export const registerSchema = joi.object({
  firstName: joi.string().required(),
  lastName:joi.string().required(),
  userName: joi.string().required(),
  role: joi.string().valid('Student', 'Parent', 'Educational_head', 'Instructor').required().default('Student'),
  email: joi.string().email().required(),
  password: joi.string().required()
});


// Login Joi Schema
export const loginSchema = joi.object({
  userName: joi.string().alphanum(),
  email: joi.string().email().optional(),
  password: joi.string().required(),
});




