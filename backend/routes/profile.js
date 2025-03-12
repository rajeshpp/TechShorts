const express = require('express');
const User = require('../models/User');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Get user profile
router.get('/', authenticate, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// Update user profile
router.put('/', authenticate, async (req, res) => {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { username, email },
        { new: true }
    );
    res.json(updatedUser);
});

module.exports = router;
