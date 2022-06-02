require('dotenv').config();
const sharp = require('sharp');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const cloudUrl = 'https://api.cloudinary.com/v1_1/dc3i4vyci/upload';
const { CLOUD_PRESET } = process.env;

module.exports = {
    // Este metodo reescala la imagen
    processImgs: async (buffer, imgType) => {
        const resizeImg = sharp(buffer).resize(200,400, {
            fit: 'outside'
        });

        const processedImg = await resizeImg.toBuffer();
        if (imgType === 'front') {
            fs.writeFileSync('assets/frontImg.jpg', processedImg);
        } else {
            fs.writeFileSync('assets/frontImg.jpg', processedImg);
        }
    },

    // Este metodo realiza la peticion a Cloudinary para guardar la imagen en sus servidores
    postImgs: async (imgType) => {
        console.log('4');
        console.log(CLOUD_PRESET);
        const formData = new FormData();
        formData.append('upload_preset', CLOUD_PRESET);
        console.log('5');
        if (imgType === 'front') {
            formData.append('file', fs.createReadStream('assets/frontImg.jpg'));
        } else {
            formData.append('file', fs.createReadStream('assets/backImg.jpg'));
        }

        console.log('5');
        const config = {
            method: 'POST',
            url: cloudUrl,
            headers: {
                ...formData.getHeaders()
            },
            data: formData
        };
        console.log('6');
        try {
            const rs = await axios(config);
            if (rs.status !== 200) {
                throw {error: 'error subiendo la imagen al servidor'}
            }
            return rs.data.secure_url;

        } catch (error) {
            return error;
        }
    },

    idGenerator: function*() {
        let id = 1;
        while (true) {
            yield id;
            id++
        }
    }
}