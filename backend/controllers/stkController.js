import { stkPush } from '../mpesa/mpesa.js';
import Payment from '../models/Payment.js'; // Import payment model

export const initiateSTKPush = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    // Send the STK Push request
    const response = await stkPush(phone, amount);
    // Log the response for debugging
    console.log('📤 STK Push Response:', JSON.stringify(response, null, 2));
    // Get the checkout request ID from the response
    const checkoutRequestId = response?.CheckoutRequestID;
    // Save the payment details to the database
    const paymentDoc = {
      checkoutRequestId,
      phone,
      amount,
      status: 'pending', 
    }
    const payment = new Payment(paymentDoc);
    const savedPayment = await payment.save();
    console.log('💾 Payment saved:', savedPayment);


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

export const handleMpesaCallback = async (req, res) => {
  // Test if callback is called
  console.log('Callback hit!')
  try {
    // Log the callback data for debugging
    console.log('📥 M-Pesa Callback Data:', JSON.stringify(req.body, null, 2));
    
    // Extract the callback and checkout request ID
    const callback = req.body.Body.stkCallback;
    const checkoutRequestId = callback.CheckoutRequestID;

    // Check the callback result code
    if (callback.ResultCode === 0) { // Success
      // Update the payment status in the database
      await Payment.findOneAndUpdate({checkoutRequestId}, {status: 'completed'})
    } else { // Failure
      await Payment.findOneAndUpdate({checkoutRequestId}, {status: 'failed'})
    }
    res.status(200).json({
      message: 'M-Pesa callback handled successfully'
    });
  } catch (error) {
    console.error('❌ Error handling M-Pesa callback:', error);
    return res.status(500).json({
      error: 'Failed to handle M-Pesa callback',
    });
  }
};


// Get payment status endpoint
export const getPaymentStatus = async (req, res) => {
  // Get the checkout request ID from the request parameters
  const { checkoutRequestId } = req.params;

  try {
    // Find the payment in the database
    const payment = await Payment.findOne({checkoutRequestId})
    // If payment not found, return 404
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    // Return the payment status
    return res.status(200).json({ status: payment.status });
  } catch (error) {

  }
}


// Force completion of payment
export const forceCompletePayment = async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;
    // Find the payment in the database
    const updated = await Payment.findOneAndUpdate({ checkoutRequestId }, {status: 'completed'})
    res.status(200).json({message: 'Payment status updated to completed'})
  } catch (error) { 
    console.error('❌ Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
}