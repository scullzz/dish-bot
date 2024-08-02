const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const bot = require('../telegram');

// Функция для преобразования BigInt и Date в строки в объекте
const transformBigIntAndDateToString = (obj) => {
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  if (Array.isArray(obj)) {
    return obj.map(transformBigIntAndDateToString);
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = transformBigIntAndDateToString(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Управление заказами
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Создание нового заказа
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *               - locationUrl
 *               - phoneNumber
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID пользователя, который делает заказ
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: ID продукта
 *                     quantity:
 *                       type: integer
 *                       description: Количество продукта
 *               locationUrl:
 *                 type: string
 *                 description: Ссылка на локацию доставки
 *               phoneNumber:
 *                 type: string
 *                 description: Номер телефона пользователя
 *     responses:
 *       200:
 *         description: Успешное создание заказа
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 order_id:
 *                   type: integer
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', async (req, res) => {
  const { user_id, items, locationUrl, phoneNumber } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }

  try {
    const order = await prisma.order.create({
      data: {
        user: {
          connect: { telegramId: BigInt(user_id) }
        },
        status: 'processing',
        locationUrl: locationUrl,
        phoneNumber: phoneNumber,
        orderItems: {
          create: items.map(item => ({
            product: { connect: { id: item.product_id } },
            quantity: item.quantity
          }))
        }
      },
    });

    // Отправляем сообщение в Telegram
    await bot.sendOrderConfirmation(user_id, order);

    res.json({ success: true, order_id: order.id });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


/**
 * @swagger
 * /api/orders/{order_id}:
 *   get:
 *     summary: Получение информации о заказе
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID заказа
 *     responses:
 *       200:
 *         description: Информация о заказе
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get('/:order_id', async (req, res) => {
  const { order_id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(order_id) },
      include: {
        orderItems: {
          include: {
            product: true
          }
        },
        user: true
      }
    });

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const transformedOrder = transformBigIntAndDateToString(order);

    res.json(transformedOrder);
  } catch (error) {
    console.error('Ошибка при получении заказа:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;