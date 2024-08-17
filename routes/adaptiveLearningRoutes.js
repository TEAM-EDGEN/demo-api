import { Router } from 'express';
import { getAdaptiveContent } from '../controllers/adaptiveLearningController.js';

const adaptiveContentRouter = Router();

adaptiveContentRouter.get('/adaptivecontent/:Id', getAdaptiveContent);

export default adaptiveContentRouter;
