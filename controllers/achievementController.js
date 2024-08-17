import { AchievementModel } from '../models/achievement.js';
import { achievementSchema } from '../schema/schema.js';

export const getAchievements = async (req, res) => {
  try {
    const achievements = await AchievementModel.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  const { error } = achievementSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newAchievement = new AchievementModel(req.body);
    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
