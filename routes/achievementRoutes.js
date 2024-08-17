import Router from 'express';
import { getAchievements, createAchievement } from '../controllers/achievementController.js';

const archievementRouter = Router();

archievementRouter.get('/achievements', getAchievements);
archievementRouter.post('/achievements', createAchievement);

export default archievementRouter;
