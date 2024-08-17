import { Router } from 'express';
import { generateChatResponse } from '../controllers/aiTutor.js';

const chatRouter = Router();

// Route for generating text using the AI model
// chatRouter.post('/chat', generateText);
chatRouter.post('/chat', generateChatResponse);


export default chatRouter;
