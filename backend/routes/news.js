const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { sendNotification } = require('../utils/notificationService');
const upload = require('../middleware/fileUpload');


// Get all news
router.get('/', async (req, res) => {
    const news = await News.find();
    res.json(news);
});

// Add news
router.post('/', async (req, res) => {
    const newNews = new News(req.body);
    await newNews.save();
    res.status(201).json(newNews);
});

// Search news by keyword
router.get('/search', async (req, res) => {
    const { keyword } = req.query;
    const news = await News.find({ title: { $regex: keyword, $options: 'i' } });
    res.json(news);
});

// Like a news article
router.post('/:id/like', authenticate, async (req, res) => {
    const news = await News.findById(req.params.id);
    if (!news.likes.includes(req.user.id)) {
        news.likes.push(req.user.id);
    }
    await news.save();
    res.json(news);
});

// Add a comment
router.post('/:id/comment', authenticate, async (req, res) => {
    const news = await News.findById(req.params.id);
    news.comments.push({ user: req.user.id, comment: req.body.comment });
    await news.save();
    res.json(news);
});

router.post('/:id/approve', authenticate, isAdmin, async (req, res) => {
    const news = await News.findById(req.params.id);
    await News.findByIdAndUpdate(req.params.id, { approved: true });

    // Send notification to all users
    const tokens = await User.find().select('fcmToken');
    tokens.forEach(user => {
        if (user.fcmToken) {
            sendNotification(user.fcmToken, 'New Tech News!', news.title);
        }
    });

    res.json({ message: 'News approved and notification sent' });
});


router.post('/upload', authenticate, upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const news = new News({ title, content, image: imageUrl, author: req.user.id });
    await news.save();
    res.json(news);
});

module.exports = router;
