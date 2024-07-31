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
 *     summary: Получение списка продуктов
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
    const products = await prisma.product.findMany({
      include: { categoryInfo: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * @swagger
 * /api/products/category/{category_id}:
 *   get:
 *     summary: Получение списка продуктов по категории
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Список продуктов в категории
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/category/:category_id', async (req, res) => {
  const {category_id} = req.params;
  try {
    const products = await prisma.product.findMany({
      where: { id: parseInt(category_id) },
      include: {categoryInfo: true },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
