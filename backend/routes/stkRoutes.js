// routes/stkRoutes.js
import express from 'express';
import { initiateSTKPush, handleMpesaCallback } from '../controllers/stkController.js';

const router = express.Router();

router.post('/pay', initiateSTKPush);
router.post('/mpesa/callback', handleMpesaCallback);

export default router;
