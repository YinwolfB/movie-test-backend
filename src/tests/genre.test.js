const request = require('supertest');
const app = require('../app');
require('../models')

let id;

test('GET /genres Trae todos los generos', async () => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /genres crea un genero', async () => {
    const newGenre = {
        name:'suspenso'
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newGenre.name);
});

test('PUT /genres/:id actualiza ', async () => {
    const update = {
        name:'triller'
    }
    const res = await request(app).put(`/genres/${id}`).send(update);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(update.name);
});

test('DELETE /genres/:id Elimina un actor por id', async() => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
})