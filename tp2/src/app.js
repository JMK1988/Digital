const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const path = require('path');
const { initializeSocket } = require('./socket');
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.router');

const app = express();
const server = http.createServer(app);

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Inicializar Socket.io
initializeSocket(server);

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
