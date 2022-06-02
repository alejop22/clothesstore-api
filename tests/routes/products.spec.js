const supertest = require('supertest');
const { expect } = require('chai');
const assert = require('assert');

const server = require('../../src/app.js');

const api = supertest(server);

describe('Ruta de inicio', () => {
    it('Deberia responder OK junto con un JSON', () => {
        api
            .get('/')
            .expect(200)
            .expect('Content-Type', 'application/json')
    });
});

describe('Ruta GET productos favoritos', () => {
    it('Deberia responder OK', () => {
        api
            .get('/products/favs')
            .expect(200)
            .expect('Content-Type', 'application/json')
    });

    it('Deberia responder un JSON con el error por lo que no hay productos',async () => {
        const rs = await supertest(server)
            .get('/products/favs')
            expect(rs.status).equal(404);
            expect(rs.body).contains({error: 'No hay ningun producto en favoritos'});
    });
});

describe('Ruta POST creacion de productos', () => {
    it('Deberia responder status 201', () => {
        api
            .post('/product')
            .expect(201);
    });

    it('Deberia responder status 400 error en la peticion', () => {
        api
        .post('/product')
        .send({name: 'algo'})
        .expect(400)
    });
});