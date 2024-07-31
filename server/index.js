const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const config = require('./config');
const telegramBot = require('./telegram');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(bodyParser.json());

// Middleware для проверки пользователей Telegram
app.use((req, res, next) => {
  const initData = req.body.initData;
  if (initData) {
    const hash = crypto.createHmac('sha256', config.SECRET_KEY)
      .update(initData)
      .digest('hex');
    if (hash !== req.body.hash) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }
  next();
});

// Подключение маршрутов
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Настройка Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Запуск сервера
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
