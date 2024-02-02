const request = require('supertest');
const app = require('../app');
require('../models')
const Movie = require('../models/Movie')

let id;

test('GET /actors trae todos los actores', async() => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors crea un actor', async() => {
/*     const movie = await Movie.create({
        name:'El curioso caso de Benjamin Button',
        image:'https://es.web.img2.acsta.net/medias/nmedia/18/68/03/69/19042450.jpg',
        synopsis:'El día en que el huracán Katrina llega a Nueva Orleans, la anciana Daisy Williams está en su lecho de muerte en un hospital de Nueva Orleans. A su lado está su hija Caroline (Julia Ormond). Daisy pide a Caroline que le lea en voz alta el diario de un amigo suyo de toda la vida, Benjamin Button.',
        releaseYear:'2008'
    }) */
    const newActor = {
        firstName: 'Brad',
        lastName: 'Pitt',
        nationality: 'Estados Unidos',
        image: 'https://e00-telva.uecdn.es/assets/multimedia/imagenes/2023/07/04/16884784570312.jpg',
        birthday: '1963-12-18'
    }

    const res = await request(app).post('/actors').send(newActor);
/*     await Movie.destroy(); */
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName)
});

test('PUT /actors/:id actualiza la informacion del actor', async() => {
    const update = {
        firstName: 'William'
    }
    const res = await request(app).put(`/actors/${id}`).send(update);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(update.firstName)
})

test('DELETE /actors/:id Elimina un actor por id', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
})
