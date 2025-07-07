// routes/stkRoutes.js
import express from 'express';
import { initiateSTKPush, handleMpesaCallback, getPaymentStatus, forceCompletePayment } from '../controllers/stkController.js';

const router = express.Router();

router.post('/pay', initiateSTKPush);
router.post('/mpesa/callback', handleMpesaCallback);
router.get('/status/:checkoutRequestId', getPaymentStatus);
router.put('/force-complete/:checkoutRequestId', forceCompletePayment);

export default router;
