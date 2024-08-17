import { BadgeModel } from '../models/badge.js';
import { badgeSchema } from '../schema/schema.js';

export const getBadges = async (req, res) => {
  try {
    const badges = await BadgeModel.find();
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBadge = async (req, res) => {
  const { error } = badgeSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newBadge = new BadgeModel(req.body);
    await newBadge.save();
    res.status(201).json(newBadge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
