const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const user_info = await prisma.user.findFirst({
            where: { telegramId: BigInt(user_id) }
        });
        res.json(user_info);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;