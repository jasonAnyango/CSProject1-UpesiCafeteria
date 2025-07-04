import express from 'express';
import {
  getTodaySummary,
  getStatusCounts,
  getOrderTrend,
} from '../controllers/staffController.js';

const router = express.Router();

router.get('/summary', getTodaySummary);
router.get('/statusCounts', getStatusCounts);
router.get('/orderTrend', getOrderTrend);

export default router;
