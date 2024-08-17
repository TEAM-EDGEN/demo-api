import { Router } from 'express';
import { getLeaderboard, createLeaderboardEntry } from '../controllers/leaderboardController.js';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/leader', getLeaderboard);
leaderBoardRouter.post('/leader', createLeaderboardEntry);

export default leaderBoardRouter;
