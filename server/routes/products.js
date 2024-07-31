const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Управление продуктами
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Получение списка всех продуктов
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список всех продуктов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
