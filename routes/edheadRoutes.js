import { Router } from 'express';
import { protect, educationalHeadOnly } from '../middlewares/auth.js';
import { getEducationalHeads, getEducationalHeadById, updateEducationalHead, deleteEducationalHead } from '../controllers/edheadController.js';


// Create a Router
const educationRouter = Router();

// Education Head routes
educationRouter.get('/educational-heads', protect, educationalHeadOnly, getEducationalHeads);
educationRouter.get('/educational-heads/:id', protect, educationalHeadOnly, getEducationalHeadById);
educationRouter.put('/educational-heads/:id', protect, educationalHeadOnly, updateEducationalHead);
educationRouter.delete('/educational-heads/:id', protect, educationalHeadOnly, deleteEducationalHead);

export default educationRouter;
