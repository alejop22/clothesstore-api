const express = require('express');
const products = require('./routes');

const server = express();
const router = express.Router();

server.use(express.json());
server.use(router);
server.use('/product', products);

server.get('/', (req, res) => {
    res.json({nombre: 'Clothesstore', descripcion: 'API Clothesstore'});
});

server.get('*', (req,res) => {
    res.status(404).json({estado: 404, error: 'recurso no encontrado'})
});

module.exports = server;