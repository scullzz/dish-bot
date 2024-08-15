const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const config = require('./config');
const telegramBot = require('./telegram');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const redisClient = require('./redisClient');
const logger = require('./logger');

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/pluswibe.space/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/pluswibe.space/fullchain.pem')
};

const { swaggerUi, specs } = require('./swagger');
const { env } = require('process');

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
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

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/webapptemplate', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Подключение маршрутов
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/user_info', require('./routes/userinfo'));

// Настройка Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Запуск HTTPS сервера на порту 443
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS сервер запущен на порту 443');
});

// Создайте HTTP сервер для перенаправления на HTTPS на порту 80
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80, () => {
  console.log('HTTP сервер запущен на порту 80 для перенаправления на HTTPS');
});


// Пример использования логгера
app.use((req, res, next) => {
  logger.info(`Запрос: ${req.method} ${req.url}`);
  next();
});

// Пример использования Redis
app.get('/cached-data', async (req, res) => {
  const key = 'someKey';
  redisClient.get(key, (err, data) => {
    if (err) {
      logger.error('Ошибка получения данных из Redis:', err);
      return res.status(500).send('Ошибка сервера');
    }
    
    if (data) {
      logger.info('Данные получены из кэша Redis');
      return res.json(JSON.parse(data));
    } else {
      const newData = { /* ваши данные */ };
      redisClient.setex(key, 3600, JSON.stringify(newData));
      logger.info('Данные сохранены в кэш Redis');
      return res.json(newData);
    }
  });
});

// Ваши остальные маршруты и логика
