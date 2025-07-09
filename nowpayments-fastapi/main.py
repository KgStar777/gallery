import os
import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
import httpx
from dotenv import load_dotenv

# Загрузка переменных окружения
load_dotenv()

NOWPAYMENTS_API_KEY = os.getenv('NOWPAYMENTS_API_KEY')
NOWPAYMENTS_CALLBACK_URL = os.getenv('NOWPAYMENTS_CALLBACK_URL')
NOWPAYMENTS_API_URL = 'https://api.nowpayments.io/v1'

app = FastAPI()

DB_PATH = './nowpayments.db'
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpoint TEXT,
        request TEXT,
        response TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')
    conn.commit()
    conn.close()
init_db()

def log_request(endpoint: str, request: dict, response: dict):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO logs (endpoint, request, response) VALUES (?, ?, ?)',
              (endpoint, str(request), str(response)))
    conn.commit()
    conn.close()

class InvoiceRequest(BaseModel):
    price_amount: float
    price_currency: str
    order_id: str
    order_description: Optional[str] = None

class PaymentRequest(BaseModel):
    price_amount: float
    price_currency: str
    pay_currency: str
    order_id: Optional[str] = None
    order_description: Optional[str] = None

async def nowpayments_request(method: str, endpoint: str, data: Optional[dict] = None, params: Optional[dict] = None):
    headers = {'x-api-key': NOWPAYMENTS_API_KEY}
    url = f"{NOWPAYMENTS_API_URL}{endpoint}"
    async with httpx.AsyncClient() as client:
        if method == 'GET':
            resp = await client.get(url, headers=headers, params=params)
        else:
            resp = await client.post(url, headers=headers, json=data)
    if resp.status_code >= 400:
        raise HTTPException(status_code=resp.status_code, detail=resp.text)
    return resp.json()

@app.post('/create-invoice')
async def create_invoice(body: InvoiceRequest):
    params = body.dict()
    params['ipn_callback_url'] = NOWPAYMENTS_CALLBACK_URL
    response = await nowpayments_request('POST', '/invoice', data=params)
    log_request('/create-invoice', params, response)
    return response

@app.post('/create-payment')
async def create_payment(body: PaymentRequest):
    params = body.dict()
    params['ipn_callback_url'] = NOWPAYMENTS_CALLBACK_URL
    response = await nowpayments_request('POST', '/payment', data=params)
    log_request('/create-payment', params, response)
    return response

@app.get('/payment-status/{payment_id}')
async def payment_status(payment_id: str):
    response = await nowpayments_request('GET', '/payment', params={'payment_id': payment_id})
    log_request('/payment-status', {'payment_id': payment_id}, response)
    return response

@app.get('/currencies')
async def currencies():
    response = await nowpayments_request('GET', '/currencies')
    log_request('/currencies', {}, response)
    return response

@app.get('/estimate-price')
async def estimate_price(amount: float, currency_from: str, currency_to: str):
    params = {'amount': str(amount), 'currency_from': currency_from, 'currency_to': currency_to}
    response = await nowpayments_request('GET', '/estimate', params=params)
    log_request('/estimate-price', params, response)
    return response

@app.get('/minimum-payment-amount')
async def minimum_payment_amount(currency_from: str, currency_to: str):
    params = {'currency_from': currency_from, 'currency_to': currency_to}
    response = await nowpayments_request('GET', '/min-amount', params=params)
    log_request('/minimum-payment-amount', params, response)
    return response

@app.get('/list-payments')
async def list_payments(limit: int = 10, page: int = 0, sortBy: Optional[str] = None, orderBy: Optional[str] = None, dateFrom: Optional[str] = None, dateTo: Optional[str] = None):
    params = {'limit': str(limit), 'page': str(page)}
    if sortBy: params['sortBy'] = sortBy
    if orderBy: params['orderBy'] = orderBy
    if dateFrom: params['dateFrom'] = dateFrom
    if dateTo: params['dateTo'] = dateTo
    response = await nowpayments_request('GET', '/payment', params=params)
    log_request('/list-payments', params, response)
    return response

@app.get('/status')
async def status():
    response = await nowpayments_request('GET', '/status')
    log_request('/status', {}, response)
    return response 