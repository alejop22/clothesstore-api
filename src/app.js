const express = require('express');
const cors = require('cors');
const products = require('./routes/products.js');
const product = require('./routes/product.js');

const server = express();
const router = express.Router();

server.use(express.json());
server.use(cors());
server.use(router);
server.use('/products/favs', products);
server.use('/product', product);

server.get('/', (req, res) => {
    res.json({nombre: 'Clothesstore', descripcion: 'API Clothesstore'});
});

server.get('*', (req,res) => {
    res.status(404).json({estado: 404, error: 'recurso no encontrado'})
});

module.exports = server;