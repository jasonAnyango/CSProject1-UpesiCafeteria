import express from 'express';
import { requestPasswordReset, verifyResetOtp, resetPassword } from '../controllers/resetController.js';

const router = express.Router();

router.post('/request-reset', requestPasswordReset);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);

export default router;