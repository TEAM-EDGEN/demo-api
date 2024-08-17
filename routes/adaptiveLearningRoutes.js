import Router from 'express';
import { getAdaptiveContent } from '../controllers/adaptiveLearningController.js';

const adaptiveContentRouter = Router();

adaptiveContentRouter.get('/adaptive-content/:Id', getAdaptiveContent);

export default adaptiveContentRouter;
