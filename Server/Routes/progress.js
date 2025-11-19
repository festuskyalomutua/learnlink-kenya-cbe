const express = require('express');
const { getProgress, updateProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getProgress).post(protect, updateProgress);

module.exports = router;
