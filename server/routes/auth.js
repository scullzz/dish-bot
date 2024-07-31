const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Авторизация и аутентификация
 */

/**
 * @swagger
 * /api/auth/telegram:
 *   post:
 *     summary: Регистрация/Авторизация пользователя через Telegram
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telegram_id
 *               - name
 *             properties:
 *               telegram_id:
 *                 type: integer
 *                 description: ID пользователя в Telegram
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *     responses:
 *       200:
 *         description: Успешная регистрация/авторизация
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/telegram', async (req, res) => {
  const { telegram_id, name } = req.body;
  try {
    const user = await prisma.user.upsert({
      where: { telegramId: BigInt(telegram_id) },
      update: { name },
      create: { telegramId: BigInt(telegram_id), name },
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
