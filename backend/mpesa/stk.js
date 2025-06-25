import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const getAccessToken = async () => {
    const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;

    // Authenticate using the consumer key and secret
    const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString('base64');

    // Construct the URL for the access token request
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    // Make the request to get the access token
    const res = await axios.get(url, {
        headers : {
            Authorization: `Basic ${auth}`
        }
    });

    return res.data.access.token
}

export const initiateStkPush = async (req, res) => {
    try {
        const { MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL } = process.env;

        const accessToken = await getAccessToken();
        
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);

        const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString('base64');

        const stkPayload = {
            BusinessShortCode: MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerBuyGoodsOnline',
            Amount: req.body.amount,
            PartyA: req.body.phoneNumber,
            PartyB: MPESA_SHORTCODE,
            PhoneNumber: req.body.phoneNumber,
            CallBackURL: MPESA_CALLBACK_URL,
            AccountReference: 'Upesi Cafeteria Online Payment Test',
            TransactionDesc: 'Payment for testing'
        }

        const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
        const response = await axios.post(url, stkPayload, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.status(200).json(response.data);

    } catch (error) {
        console.error('Error initiating STK push:', error);
        res.status(500).json({ error: 'Failed to initiate STK push' });        
    }
}