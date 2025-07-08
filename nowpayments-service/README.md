# NOWPayments Service

## Описание
Backend-сервис для создания счетов через NOWPayments API. Принимает запросы с фронтенда и возвращает ссылку на оплату.

## Переменные окружения (.env)
```
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
NOWPAYMENTS_API_URL=https://api.nowpayments.io/v1
NOWPAYMENTS_CALLBACK_URL=https://yourdomain.com/payment-callback
PORT=3000
```

## Установка и запуск
```bash
npm install
npm start
```

## Endpoint
### POST /create-invoice
**Body:**
```
{
  "price_amount": 100,
  "price_currency": "usd",
  "order_id": "1234",
  "order_description": "Test order"
}
```
**Response:**
- Данные счета NOWPayments (включая ссылку на оплату) 