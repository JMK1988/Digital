const { Server } = require('socket.io');
const ProductModel = require('./models/product.model');

let io;

const initializeSocket = (server) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado');

        // Enviar productos actuales al conectar
        emitProducts();

        // Escuchar nuevo producto
        socket.on('addProduct', async (product) => {
            await ProductModel.addProduct(product);
            emitProducts();
        });

        // Escuchar eliminación de producto
        socket.on('deleteProduct', async (id) => {
            await ProductModel.deleteProduct(id);
            emitProducts();
        });
    });
};

const emitProducts = async () => {
    const products = await ProductModel.getAllProducts();
    io.emit('products', products);
};

module.exports = {
    initializeSocket,
    getIO: () => io
};