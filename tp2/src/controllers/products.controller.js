const ProductModel = require('../models/product.model');
const { getIO } = require('../socket');

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await ProductModel.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async addProduct(req, res) {
        try {
            const product = await ProductModel.addProduct(req.body);
            // Emitir actualización a través de websocket
            getIO().emit('products', await ProductModel.getAllProducts());
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const result = await ProductModel.deleteProduct(parseInt(req.params.id));
            if (result) {
                // Emitir actualización a través de websocket
                getIO().emit('products', await ProductModel.getAllProducts());
                res.json({ message: 'Producto eliminado' });
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;