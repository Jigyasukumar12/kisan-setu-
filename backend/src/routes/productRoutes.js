const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(addProduct);

module.exports = router;
