const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const prisma = require('./prisma');

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
    bot.sendMessage(chatId, 'Добро пожаловать в наш сервис доставки еды!');
  } catch (error) {
    bot.sendMessage(chatId, 'Произошла ошибка при регистрации.');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // Добавьте логику обработки сообщений здесь
});

module.exports = bot;
