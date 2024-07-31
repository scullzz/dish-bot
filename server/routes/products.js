const express = require('express');
const router = express.Router();
const prisma = require('../prisma');



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

router.get('/category/:category_id', async (req, res) => {
  const {category_id} = req.params;
  try{
    const products = await prisma.product.findMany({
      where: { id: parseInt(category_id) },
      include: {categoryInfo: true },
    });
    res.json(products);
  } catch(error){
    res.status(500).json({success: false, error: error.message});
  }
});

module.exports = router;
