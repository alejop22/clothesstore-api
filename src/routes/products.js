const express = require('express');
const router = express.Router();
const products = require('../db.js');


// Esta ruta permite obtener los productos
router.get('/', (req, res) => {
    try {
        if (products.length === 0) {
            throw {error: 'No hay ningun producto en favoritos'}
        }

        const favProducts = [];

        for (const i of products) {
            const auxObj = {
                id: i.id,
                name: i.name,
                price: i.price, 
                priceDisc: i.price - (i.discount/100)*i.price,
                discount: i.discount+'%',
                imgFront: i.imgList[0].urlImgFront,
                imgBack: i.imgList[1].urlImgBack,
            }

            favProducts.push(auxObj)
        }

        res.json(favProducts);
    } catch (error) {
        res.status(404).json(error)
    }
});


module.exports = router;