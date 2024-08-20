import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';

export const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'No token provided' });

  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};


// middleware for Role Auth
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
  };
};


// middleware for admin only
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};


// middleware for student only
export const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Students only' });
  }
};


// middleware for Parents only
export const parentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'parent') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Parents only' });
  }
};




// middleware for instructor only
export const instructorOnly = (req, res, next) => {
  if (req.user && req.user.role === 'instructor') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Instructors only' });
  }
};









// middleware for Edhead only
export const educationalHeadOnly = (req, res, next) => {
  if (req.user && req.user.role === 'educationalHead') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Educational Heads only' });
  }
};




export const verifyUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Log the token for debugging
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Log the decoded token
      
      req.user = await User.findById(decoded.id).select('-password');
      console.log('Authenticated User:', req.user); // Log the authenticated user

      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Token verification failed' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};







// Verify user by checking JWT token in headers
// export const verifyUser = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select('-password');
      
//       if (!req.user) {
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//       }

//       next();
//     } catch (error) {
//       res.status(401).json({ message: 'Unauthorized: Token verification failed' });
//     }
//   } else {
//     res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }
// };

// Session-based user verification (alternative method)
// export const verifyUserSession = (req, res, next) => {
//   if (req.session && req.session.user) {
//     req.user = req.session.user;
//     next();
//   } else {
//     res.status(401).json({ message: 'Unauthorized: Session not found or expired' });
//   }
// };

