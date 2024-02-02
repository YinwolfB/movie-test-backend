const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies trae todas los peliculas', async() => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies crea una pelicula', async () => {
    const newMovie = {
        name:'El curioso caso de Benjamin Button',
        image:'https://es.web.img2.acsta.net/medias/nmedia/18/68/03/69/19042450.jpg',
        synopsis:'El día en que el huracán Katrina llega a Nueva Orleans, la anciana Daisy Williams está en su lecho de muerte en un hospital de Nueva Orleans. A su lado está su hija Caroline (Julia Ormond). Daisy pide a Caroline que le lea en voz alta el diario de un amigo suyo de toda la vida, Benjamin Button.',
        releaseYear:'2008'
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

//POST /movies/:id/actors

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: 'test firstName',
        lastName: 'test lastName',
        nationality: 'test nationality',
        image: 'test img',
        birthday: 'test 1969-05-14'
    })

    const res = await request(app)
    .post(`/movies/${id}/actors`)
    .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

//POST /movies/:id/directors
test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: 'test firstName',
        lastName: 'test lastName',
        nationality: 'test nationality',
        image: 'test img',
        birthday: 'test 1969-05-14'
    })

    const res = await request(app)
    .post(`/movies/${id}/directors`)
    .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

//POST /movies/:id/genres
test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({
        name:'test genre'
    })
    const res = await request(app)
    .post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});


test('PUT /movies/:id actualiza', async () => {
    const update = {
        image:'https://laestacioneditora.com/wp-content/uploads/2019/02/L135_benajmin_tapa.jpg'
    }
    const res = await request(app).put(`/movies/${id}`).send(update);
    expect(res.status).toBe(200);
    expect(res.body.image).toBe(update.image);
});

test('DELETE /moives/:id Elimina una pelicula por id', async() => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
})