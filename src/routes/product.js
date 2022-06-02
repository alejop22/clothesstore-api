const express = require('express');
const router = express.Router();
const products = require('../db.js');
const multer = require('multer');
const fs = require('fs');
const { processImgs, postImgs, idGenerator,removeImgs } = require('../helpers');

const uploadImgs = multer({storage: multer.memoryStorage()});
const objGenerator = idGenerator();

// Esta ruta permite la creacion de productos junto con el envio de las imagenes
const imgs = uploadImgs.fields([{name: 'img_front', maxCount: 1}, {name: 'img_back', maxCount: 1}]);
router.post('/', imgs, async (req, res) => {
    let {name, description, price, discount, country} = req.body;
    const {img_front, img_back} = req.files;

    try {
        if (!name || !description || !price || !discount || !country || !img_front || !img_back) {
            throw {error: 'Peticion invalida, faltan datos'}
        }
            country = country.charAt(0).toUpperCase() + country.slice(1);
            price = price*1;
            discount = discount*1;

        if(!/^[A-Z]+$/i.test(country) || country.length <= 2) {
            throw {error: 'Pais no valido'}
        }
        else if (discount > 50 && country === 'Colombia' || country === 'Mexico') {
            throw {error: 'Peticion invalida, descuento demasiado alto para el país'}
        } else if (discount > 30 && country === 'Chile' || country === 'Peru') {
            throw {error: 'Peticion invalida, descuento demasiado alto para el país'}
        }

        if (img_front[0].size >= 1000000) {
            await processImgs(img_front[0].buffer, 'front')
        } else {
            fs.writeFileSync('assets/frontImg.jpg', img_front[0].buffer);
        }
        if (img_back[0].size >= 1000000) {
            await processImgs(img_back[0].buffer, 'back')
        } else {
            fs.writeFileSync('assets/backImg.jpg', img_back[0].buffer);
        }

        const urlImgFront = await postImgs('front');
        const urlImgBack = await postImgs('back');
        const imgList = [{urlImgFront},{urlImgBack}];

        removeImgs();

        const auxObj = {id:objGenerator.next().value, name,description, price, discount, imgList, country}
        products.push(auxObj);
        
        res.status(201).json(auxObj);

    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;