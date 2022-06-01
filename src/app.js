const express = require('express');
const products = require('../src/routes/products');

const server = express();
const router = express.Router();

server.use(express.json());
server.use(router);
server.use('/product', products);

server.get('*', (req,res) => {
    res.send('mkkkkkkk')
});

module.exports = server;