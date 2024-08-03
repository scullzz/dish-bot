const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const telegramId = BigInt(user_id);

        const user_info = await prisma.user.findFirst({
            where: { telegramId: telegramId }
        });

        if (!user_info) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json(user_info);
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
