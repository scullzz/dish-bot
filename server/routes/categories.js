const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Управление категориями
 */


/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Получение списка категорий
 *     tags: [Categories]
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
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

router.get('/products', async(req, res) => {
    try{
        const categories = await prisma.category.findMany({
            include: { products: true },
        });
        res.json(categories);
    } catch(error){
        res.status(500).json({success: false, error: error.message});
    }
})

module.exports = router;
