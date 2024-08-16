import Achievement from '../models/Achievement.js';
import Badge from '../models/badge.js';
import Leaderboard from '../models/Leaderboard.js';

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  const { userId, badge } = req.body;

  try {
    const newAchievement = new Achievement({ userId, badge });
    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ score: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
