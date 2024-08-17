import { Router } from 'express';
import { getBadges, createBadge } from '../controllers/badgeController.js';
import { protect } from '../middlewares/auth.js';


const badgeRouter = Router();

badgeRouter.get('/badge', protect, getBadges);
badgeRouter.post('/badge', protect, createBadge);

export default badgeRouter;
