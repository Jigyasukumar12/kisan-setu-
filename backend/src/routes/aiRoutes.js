const express = require('express');
const { detectDisease, suggestPrice, chatAssistant } = require('../controllers/aiController');

const router = express.Router();

router.post('/disease-detection', detectDisease);
router.post('/price-suggestion', suggestPrice);
router.post('/chatbot', chatAssistant);

module.exports = router;
