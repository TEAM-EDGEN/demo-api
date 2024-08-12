import express from 'express';
import { getMeetingLink } from '../controllers/videoController.js';

const router = express.Router();

router.get('/meeting-link', getMeetingLink);

export default router;
