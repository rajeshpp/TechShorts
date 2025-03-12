const express = require('express');
const News = require('../models/News');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Middleware to check Admin role
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};

// Approve news
router.post('/news/:id/approve', authenticate, isAdmin, async (req, res) => {
    await News.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: 'News approved' });
});

// Delete news
router.delete('/news/:id', authenticate, isAdmin, async (req, res) => {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
});

// Get all unapproved news
router.get('/news/unapproved', authenticate, isAdmin, async (req, res) => {
    const news = await News.find({ approved: false });
    res.json(news);
});

module.exports = router;
