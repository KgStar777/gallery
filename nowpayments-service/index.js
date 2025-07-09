import express from 'express';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import NowPaymentsApi from '@nowpaymentsio/nowpayments-api-js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const apiKey = process.env.NOWPAYMENTS_API_KEY;
const callbackUrl = process.env.NOWPAYMENTS_CALLBACK_URL;
const api = new NowPaymentsApi({ apiKey });

// Open SQLite DB
let db;
(async () => {
  db = await open({
    filename: './nowpayments.db',
    driver: sqlite3.Database
  });
  // Create logs table if not exists
  await db.run(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    endpoint TEXT,
    request TEXT,
    response TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
})();

/**
 * Log request and response to SQLite
 */
async function logRequest(endpoint, request, response) {
  await db.run(
    'INSERT INTO logs (endpoint, request, response) VALUES (?, ?, ?)',
    endpoint,
    JSON.stringify(request),
    JSON.stringify(response)
  );
}

/**
 * POST /create-invoice
 * Create a new invoice
 */
app.post('/create-invoice', async (req, res) => {
  try {
    const params = { ...req.body, ipn_callback_url: callbackUrl };
    const response = await api.createInvoice(params);
    await logRequest('/create-invoice', req.body, response);
    res.json(response);
  } catch (error) {
    await logRequest('/create-invoice', req.body, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * POST /create-payment
 * Create a new payment
 */
app.post('/create-payment', async (req, res) => {
  try {
    const params = { ...req.body, ipn_callback_url: callbackUrl };
    const response = await api.createPayment(params);
    await logRequest('/create-payment', req.body, response);
    res.json(response);
  } catch (error) {
    await logRequest('/create-payment', req.body, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /payment-status/:payment_id
 * Get payment status by ID
 */
app.get('/payment-status/:payment_id', async (req, res) => {
  try {
    const { payment_id } = req.params;
    const response = await api.getPaymentStatus({ payment_id });
    await logRequest('/payment-status', req.params, response);
    res.json(response);
  } catch (error) {
    await logRequest('/payment-status', req.params, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /currencies
 * Get available currencies
 */
app.get('/currencies', async (req, res) => {
  try {
    const response = await api.getCurrencies();
    await logRequest('/currencies', {}, response);
    res.json(response);
  } catch (error) {
    await logRequest('/currencies', {}, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /estimate-price
 * Get estimated price
 * Query: amount, currency_from, currency_to
 */
app.get('/estimate-price', async (req, res) => {
  try {
    const { amount, currency_from, currency_to } = req.query;
    const response = await api.getEstimatePrice({ amount, currency_from, currency_to });
    await logRequest('/estimate-price', req.query, response);
    res.json(response);
  } catch (error) {
    await logRequest('/estimate-price', req.query, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /minimum-payment-amount
 * Get minimum payment amount
 * Query: currency_from, currency_to
 */
app.get('/minimum-payment-amount', async (req, res) => {
  try {
    const { currency_from, currency_to } = req.query;
    const response = await api.getMinimumPaymentAmount({ currency_from, currency_to });
    await logRequest('/minimum-payment-amount', req.query, response);
    res.json(response);
  } catch (error) {
    await logRequest('/minimum-payment-amount', req.query, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /list-payments
 * Get list of payments
 * Query: limit, page, sortBy, orderBy, dateFrom, dateTo
 */
app.get('/list-payments', async (req, res) => {
  try {
    const response = await api.getListPayments(req.query);
    await logRequest('/list-payments', req.query, response);
    res.json(response);
  } catch (error) {
    await logRequest('/list-payments', req.query, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

/**
 * GET /status
 * Get API status
 */
app.get('/status', async (req, res) => {
  try {
    const response = await api.status();
    await logRequest('/status', {}, response);
    res.json(response);
  } catch (error) {
    await logRequest('/status', {}, error.message || error);
    res.status(500).json({ error: error.message || error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 