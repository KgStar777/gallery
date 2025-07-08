import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY;
const NOWPAYMENTS_API_URL = process.env.NOWPAYMENTS_API_URL;
const NOWPAYMENTS_CALLBACK_URL = process.env.NOWPAYMENTS_CALLBACK_URL;

app.post('/create-invoice', async (req, res) => {
  try {
    const { price_amount, price_currency, order_id, order_description } = req.body;
    if (!price_amount || !price_currency || !order_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const response = await axios.post(
      `${NOWPAYMENTS_API_URL}/invoice`,
      {
        price_amount,
        price_currency,
        order_id,
        order_description,
        ipn_callback_url: NOWPAYMENTS_CALLBACK_URL
      },
      {
        headers: {
          'x-api-key': NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 