# NOWPayments Service

## Описание
Backend-сервис для работы с NOWPayments API: создание счетов, платежей, получение статусов, валют, истории и т.д. Все запросы и ответы логируются в SQLite.

## Переменные окружения (.env)
```
NOWPAYMENTS_API_KEY=your_nowpayments_api_key
NOWPAYMENTS_CALLBACK_URL=https://yourdomain.com/payment-callback
PORT=3000
```

## Установка и запуск
```bash
npm install
npm start
```

## API Endpoints

### POST /create-invoice
Создать счет на оплату.
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

---

### POST /create-payment
Создать платеж напрямую.
**Body:**
```
{
  "price_amount": 100,
  "price_currency": "usd",
  "pay_currency": "btc",
  "order_id": "1234",
  "order_description": "Test order"
}
```
**Response:**
- Данные платежа NOWPayments

---

### GET /payment-status/:payment_id
Получить статус платежа по ID.
**Response:**
- Статус платежа

---

### GET /currencies
Получить список поддерживаемых валют.
**Response:**
- Массив валют

---

### GET /estimate-price?amount=100&currency_from=usd&currency_to=btc
Получить оценку стоимости в другой валюте.
**Response:**
- Оценка стоимости

---

### GET /minimum-payment-amount?currency_from=usd&currency_to=btc
Минимальная сумма платежа для пары валют.
**Response:**
- Минимальная сумма

---

### GET /list-payments?limit=10&page=0
Получить список платежей (история).
**Response:**
- Массив платежей

---

### GET /status
Проверить статус API NOWPayments.
**Response:**
- Информация о статусе

---

## Логирование
Все запросы и ответы логируются в файл SQLite: nowpayments.db, таблица logs. 