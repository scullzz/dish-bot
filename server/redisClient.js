const redis = require('redis');

// Создаем клиент Redis
const client = redis.createClient({
  host: 'localhost', // или укажите ваш хост, если используете облачный Redis
  port: 6379 // стандартный порт для Redis
});

client.on('error', (err) => {
  console.error('Ошибка подключения к Redis:', err);
});

client.on('connect', () => {
  console.log('Подключение к Redis успешно');
});

module.exports = client;
