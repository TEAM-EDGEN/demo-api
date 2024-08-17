import { LeaderboardModel } from '../models/leaderboard.js';
import { leaderboardSchema} from '../schema/schema.js';

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ score: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLeaderboardEntry = async (req, res) => {
  const { error } = leaderboardSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newEntry = new LeaderboardModel(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
