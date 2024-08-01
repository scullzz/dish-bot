const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const prisma = require('./prisma');
const { text } = require('body-parser');

const webAppUrl = 'https://www.google.com/'

const bot = new TelegramBot(config.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;
  const name = msg.from.first_name;

  try {
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(telegramId) },
      update: { name },
      create: { telegramId: BigInt(telegramId), name },
    });
    await bot.sendMessage(chatId, 'Добро пожаловать в наш сервис доставки еды!', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
        ],
      }
    });
  } catch (error) {
    await bot.sendMessage(chatId, 'Произошла ошибка при регистрации.');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
});

module.exports = bot;
