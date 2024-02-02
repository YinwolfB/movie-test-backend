const request = require('supertest');
const app = require('../app');
require('../models')

let id;

test('GET /directors trae todos los actores', async() => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors crea un director', async () => {
    const newDirector = {
        firstName:'David',
        lastName:'Fincher',
        nationality:'Estados unidos',
        image:'https://pics.filmaffinity.com/078315252655922-nm_200.jpg',
        birthday:'1962-08-28',
    }
    const res = await request(app).post('/directors').send(newDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT /directors/:id actualiza', async () => {
    const update = {
        firstName:'Davey'
    }
    const res = await request(app).put(`/directors/${id}`).send(update);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(update.name);
});

test('DELETE /directors/:id Elimina un director por id', async() => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
})