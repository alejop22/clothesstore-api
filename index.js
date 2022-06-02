require('dotenv').config();
const server = require('./src/app.js');
const { PORT } = process.env;

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});