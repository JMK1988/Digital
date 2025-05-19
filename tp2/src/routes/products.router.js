const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');

router.get('/', ProductController.getProducts);
router.post('/', ProductController.addProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;