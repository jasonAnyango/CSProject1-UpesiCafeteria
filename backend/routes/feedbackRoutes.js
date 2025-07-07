// backend/routes/feedbackRoutes.js
import { Router } from 'express';
import {
  submitFeedback,     
  getAllFeedback,      
  getUserFeedback,     
  updateFeedbackStatus 
} from '../controllers/feedbackController.js';

const router = Router();
router.post('/feedback', submitFeedback);
router.get('/', getAllFeedback);
router.get('/user/:email', getUserFeedback);
router.patch('/:id', updateFeedbackStatus);

export default router;
