import { UserModel, resetTokenModel } from '../models/userModel.js';
import { registerSchema, loginSchema } from '../schema/schema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



// Register function
// export const register = async (req, res) => {
//   const { firstName, lastName, userName, email, password, role } = req.body;

//   try {
//     // Validate input data
//     const { error } = registerSchema.validate({ firstName, lastName, userName, email, password, role });
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     // Check if user already exists
//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new UserModel({
//       firstName,
//       lastName,
//       userName,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// LogIn function

// Register function

export const register = async (req, res, next) => {
  const { firstName, lastName, userName, email, password, role } = req.body;

  try {
    // Validate input data
    const { error } = registerSchema.validate({ firstName, lastName, userName, email, password, role });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Send successful response
    res.status(201).json({
      message: 'User registered successfully',
    });
  } catch (error) {
    // Pass error to the next middleware
    next(error);
  }
};



export const login = async (req, res) => {
  const { email, userName, password } = req.body;

  try {
    // Validate input data
    const { error } = loginSchema.validate({ email, userName, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if at least one of email or username is provided
    if (!email && !userName) {
      return res.status(400).json({ message: 'Email or Username is required' });
    }

    // Find user by email or username
    const user = await UserModel.findOne({
      $or: [{ email }, { userName }],
    });

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, userName: user.userName, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    // Initialize session if using session management
    if (req.session) {
      req.session.user = { id: user._id, userName: user.userName, role: user.role };
    }

    // Send success response
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error('Login error:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};








// Forgot Password function
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = await resetTokenModel.create({
      userId: user._id,
      expiredAt: Date.now() + 3600000,
       // 1 hour
    });

    await nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    }).sendMail({
      to: req.body.email,
      from: process.env.SMTP_USERNAME,
      subject: "Reset Password",
      html: `
        <h3>Hello ${user.userName}</h3>
        <p>Please follow the link below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken._id}">Click Here</a>
      `,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

// Reset Password function
export const resetPassword = async (req, res, next) => {
  try {
    const resetToken = await resetTokenModel.findById(req.params.id);
    if (!resetToken) {
      return res.status(404).json({ message: 'Reset Token Not Found' });
    }

    if (resetToken.expired || Date.now() > resetToken.expiredAt) {
      return res.status(409).json({ message: 'Invalid Reset Token' });
    }

    res.status(200).json({ message: 'Valid Reset Token' });
  } catch (error) {
    next(error);
  }
};

// User Logout function
export const logOut = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'User logged out successfully' });
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users function
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User by ID function
export const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update User function
export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete User function
export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};











// logIn

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
//     res.status(200).json({ token, user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };






// Forgot password function

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await UserModel.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const token = crypto.randomBytes(20).toString('hex');
//     // Save token to user for password reset
//     user.resetPasswordToken = token;
//     // 1 hour
//  user.resetPasswordExpire = Date.now() + 3600000;    await user.save();

//     // Send email with reset link (using nodemailer)
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       to: user.email,
//       from: process.env.EMAIL_USER,
//       subject: 'Password Reset',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://${req.headers.host}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Password reset link sent' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
