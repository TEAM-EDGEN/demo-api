import Router from 'express';
import { getAchievements, createAchievement } from '../controllers/achievementController.js';

const achievementRouter = Router();

achievementRouter.get('/achievements', getAchievements);
achievementRouter.post('/achievements', createAchievement);

export default achievementRouter;
