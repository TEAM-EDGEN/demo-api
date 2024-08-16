import express from 'express';
import { getAchievements, createAchievement } from '../controllers/achievementController.js';

const router = express.Router();

router.get('/achievements', getAchievements);
router.post('/achievements', createAchievement);

export default router;
