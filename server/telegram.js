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
    // Сначала запросим контакт пользователя
    await bot.sendMessage(chatId, 'Пожалуйста, поделитесь своим контактом для продолжения.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [{
            text: 'Отправить контакт',
            request_contact: true
          }]
        ],
        resize_keyboard: true
      }
    });

    // Сохраним пользователя в базу данных
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(telegramId) },
      update: { name },
      create: { telegramId: BigInt(telegramId), name },
    });

    // Дождемся контакта пользователя
    bot.once('contact', async (msg) => {
      const contact = msg.contact;
      if (contact) {
        await prisma.user.update({
          where: { telegramId: BigInt(telegramId) },
          data: { phoneNumber: contact.phone_number },
        });

        // После получения контакта отправим кнопку "Сделать заказ"
        await bot.sendMessage(chatId, 'Спасибо! Теперь вы можете сделать заказ.', {
          reply_markup: {
            inline_keyboard: [
              [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
            ],
            remove_keyboard: true
          }
        });
      }
    });

  } catch (error) {
    await bot.sendMessage(chatId, 'Произошла ошибка при регистрации.');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
});

// Функция для отправки подтверждения заказа и запроса локации
bot.sendOrderConfirmation = async (userId, order) => {
  try {
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(userId) }
    });

    if (!user) {
      console.error('Пользователь не найден');
      return;
    }

    const chatId = BigInt(user.telegramId);
    let totalCost = 0;
    const orderItems = order.orderItems.map(item => {
      const itemCost = item.quantity * item.product.price;
      totalCost += itemCost;
      return `${item.quantity} x ${item.product.name} - ${itemCost}сум`;
    }).join('\n');

    // Запрос на отправку локации
    await bot.sendMessage(chatId, 'Пожалуйста, поделитесь своей локацией для доставки.', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [
          [{
            text: 'Отправить локацию',
            request_location: true
          }]
        ],
        resize_keyboard: true
      }
    });

    // Обработчик для получения локации
    bot.once('location', async (msg) => {
      const location = msg.location;
      if (location) {
        const locationUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

        // Обновление заказа с локацией
        await prisma.order.update({
          where: { id: order.id },
          data: { locationUrl: locationUrl },
        });

        await bot.sendMessage(chatId, 'Спасибо! Ваша локация получена.');

        // Отправка подтверждения заказа
        const message = `Ваш заказ был успешно создан!\n\nПредметы заказа:\n${orderItems}\n\nОбщая стоимость: ${totalCost}сум\n\nВаш заказ будет доставлен по адресу: ${locationUrl} в течение примерно 25 минут. Спасибо за ваш заказ!`;
        await bot.sendMessage(chatId, message, {
          reply_markup: {
            remove_keyboard: true,
            inline_keyboard: [
              [{ text: 'Начать заказ', web_app: { url: webAppUrl } }]
            ],
          }
        });
      }
    });

  } catch (error) {
    console.error('Ошибка при отправке подтверждения заказа:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при обработке вашего заказа.');
  }
};

module.exports = bot;
