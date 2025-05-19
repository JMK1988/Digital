const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product.model');

router.get('/', async (req, res) => {
    const products = await ProductModel.getAllProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await ProductModel.getAllProducts();
    res.render('realTimeProducts', { products });
});

module.exports = router;