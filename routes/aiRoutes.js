import { Router } from 'express';
import { generateText, generateChatResponse } from '../controllers/aiTutor.js';

const chatRouter = Router();

// Route for generating text using the AI model
chatRouter.post('/ai', generateText);
chatRouter.post('/chat', generateChatResponse);


export default chatRouter;
