const express = require('express');
const router = express.Router();

// @route   GET /api/test
// @desc    Test route - verify server & DB are up
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🌾 KisanSetu API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

module.exports = router;
