const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const prisma = require('./prisma');
const { text } = require('body-parser');

const webAppUrl = 'https://pluswibe.space/'

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

// Функция для отправки подтверждения заказа
bot.sendOrderConfirmation = async (userId, order) => {
  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(userId) }
    });

    if (!user) {
      console.error('Пользователь не найден');
      return;
    }

    const chatId = parseInt(user.telegramId);
    const orderItems = order.orderItems.map(item => `${item.quantity} x ${item.product.name}`).join('\n');
    const message = `Ваш заказ был успешно создан!\n\nПредметы заказа:\n${orderItems}\n\nСпасибо за ваш заказ!`;

    await bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Ошибка при отправке подтверждения заказа:', error);
  }
};

module.exports = bot;
