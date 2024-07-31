// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API для заказа и доставки еды',
    },
    servers: [
      {
        url: `http://185.189.167.220:${config.PORT}`,
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID пользователя',
            },
            telegramId: {
              type: 'integer',
              description: 'ID пользователя в Telegram',
            },
            name: {
              type: 'string',
              description: 'Имя пользователя',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID продукта',
            },
            name: {
              type: 'string',
              description: 'Название продукта',
            },
            description: {
              type: 'string',
              description: 'Описание продукта',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Цена продукта',
            },
            imageUrl: {
              type: 'string',
              description: 'Ссылка на изображение продукта',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID заказа',
            },
            userId: {
              type: 'integer',
              description: 'ID пользователя, который сделал заказ',
            },
            status: {
              type: 'string',
              description: 'Статус заказа',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата и время создания заказа',
            },
            locationUrl: {
              type: 'string',
              description: 'Ссылка на локацию доставки',
            },
            phoneNumber: {
              type: 'string',
              description: 'Номер телефона пользователя',
            },
            orderItems: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem',
              },
            },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID элемента заказа',
            },
            orderId: {
              type: 'integer',
              description: 'ID заказа',
            },
            productId: {
              type: 'integer',
              description: 'ID продукта',
            },
            quantity: {
              type: 'integer',
              description: 'Количество продукта',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
