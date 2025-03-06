require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');

// Загружаем переменные из .env
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ALLOWED_USERS = process.env.ALLOWED_USERS.split(',').map(id => parseInt(id, 10));
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const PORT = process.env.PORT || 3124;

// Создаём бота
const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

app.post('/webhook', async (req, res) => {
    try {
        const data = req.body;

        // Проверяем, есть ли необходимые данные
        if (!data || !data.entry || !data.model) {
            return res.status(400).send('Нет данных');
        }

        const message = `📩 *Новая заявка!*\n\n🆔 ID: ${request.id}\n📅 Дата: ${request.createdAt}\n\n`;

        if (data.model === "subscription-form") {
          message = message + `Имя: ${request.name}\n Емайл: ${request.email}`
        }

        if (data.model === "request-price-form") {
          message = message + `Имя: ${request.fullname}\n Емайл: ${request.email}\т Телефон: ${request.phone}\n Комментрий: ${request.comment}`
        }

        for (const uId of ALLOWED_USERS) {
            bot.telegram.sendMessage(uId, message, {
                parse_mode: "Markdown"
            })

        }

        res.status(200).send('Webhook обработан');
    } catch (error) {
        console.error('Ошибка обработки вебхука:', error);
        res.status(500).send('Ошибка сервера');
    }
});

console.log("✅ Бот запущен...");

// Функция проверки доступа
const checkAccess = (ctx) => {
    const userId = ctx.from.id;
    if (!ALLOWED_USERS.includes(userId)) {
        ctx.reply("⛔️ Доступ запрещён.");
        return false;
    }
    return true;
};

// Команда /start
bot.start((ctx) => {
    if (!checkAccess(ctx)) return;
    ctx.reply("Привет! Ты имеешь доступ к запросам и уведомлениям поступающим в галерею. 🚀");
});

// // Обработчик сообщений
// bot.on('text', (ctx) => {
//     if (!checkAccess(ctx)) return;
//     ctx.reply(`Вы сказали: ${ctx.message.text}`);
// });

app.listen(PORT, () => {
    console.log(`Webhook-сервер запущен на порту ${PORT}`);
});

// Запуск бота
bot.launch();

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
