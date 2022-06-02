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
            fs.writeFileSync('frontImg.jpg', processedImg);
        } else {
            fs.writeFileSync('backImg.jpg', processedImg);
        }
    },

    // Este metodo realiza la peticion a Cloudinary para guardar la imagen en sus servidores
    postImgs: async (imgType) => {
        const formData = new FormData();
        formData.append('upload_preset', CLOUD_PRESET);

        if (imgType === 'front') {
            try {
                formData.append('file', fs.createReadStream('frontImg.jpg'));
            } catch (error) {
                throw error
            }
        } else {
            try {
                formData.append('file', fs.createReadStream('backImg.jpg'));
            } catch (error) {
                throw error
            }
        }

        const config = {
            method: 'POST',
            url: cloudUrl,
            headers: {
                ...formData.getHeaders()
            },
            data: formData
        };
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
    },

    removeImgs: () => {
        const files = ['frontImg.jpg','backImg.jpg'];

        for (const i of files) {
            try {
                fs.unlinkSync(i)
                console.log('Se elimino la imagen');
            } catch (error) {
                console.log(`Algo salio mal ${error}`)
            }
        }
    }
}