const express = require('express');
const router = express.Router();
const db = require('../../db.js');
const multer = require('multer');

const uploadImgs = multer({dest: '/src/assets'});

router.get('/', (req, res) => {
    try {
        if (db.length === 0) {
            throw {error: 'No hay ningun producto en favoritos'}
        }

        res.json(db);
    } catch (error) {
        res.status(404).json(error)
    }
});

const imgs = uploadImgs.fields([{name: 'img_front', maxCount: 1}, {name: 'img_back', maxCount: 1}]);
router.post('/', imgs, (req, res) => {
    const {name, description, price, discount, country} = req.body;
    const {img_front, img_back} = req.files;
    console.log(img_front);
    console.log(img_back);

    try {
        if (!name || !description || !price || !discount || !country || !img_front || !img_back) {
            throw {error: 'Peticion invalida'}
        }

        const auxObj = {name,description, price, discount, country}
        db.push(auxObj);
        
        res.status(201).json(auxObj);

    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;