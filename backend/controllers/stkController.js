// controllers/stkController.js
import { stkPush } from '../mpesa/mpesa.js';

export const initiateSTKPush = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await stkPush(phone, amount);
    res.status(200).json(response);
  } catch (error) {
    console.error('⚠️ STK Push error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};

export const handleMpesaCallback = (req, res) => {
  console.log('📥 M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
};
