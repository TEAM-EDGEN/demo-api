import User from '../models/userModel.js';
import Course from '../models/course.js';

export const getAdaptiveContent = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    const userProgress = user.progress; // Example progress tracking

    const content = await Course.find({ difficulty: { $lte: userProgress } });

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
