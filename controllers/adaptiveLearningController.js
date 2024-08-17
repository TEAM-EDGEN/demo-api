import { UserModel } from '../models/userModel.js';
import { CourseModel } from '../models/course.js';

export const getAdaptiveContent = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    // Example progress tracking
    const userProgress = user.progress; 

    const content = await CourseModel.find({ difficulty: { $lte: userProgress } });

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
