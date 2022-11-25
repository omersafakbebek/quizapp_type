import { response } from 'express';
import request from 'supertest';
import app from '../../app';
import { User, Users } from '../models/user.model';
beforeAll(async () => {
  try {
    await Users.drop();

  } catch (error) {

  }
})
describe('GET /api/v1/users', () => {
  it('responds with an array of users', async () =>
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      })
  );
});
describe('POST /api/v1/users', () => {
  it('responds with an error if the user is invalid', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        username: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');

      })
  );
});
let id = '';
describe('POST /api/v1/users', () => {
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        username: 'username',
        password: 'password',
        name:'name',
        surname:'surname',
        email:'mail@mail.com',
        role: 'user'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('password');
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body.username).toBe('username');
      })
  );
});
describe('GET /api/v1/users/:id', () => {
  it('responds with a single user', async () =>
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('password');
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body.username).toBe('username')
        // expect(response.body[0]).toHaveProperty('content');
        // expect(response.body[0]).toHaveProperty('done');
      })
  );
});

describe('PUT /api/v1/users/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/users/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/users/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        username: 'username',
        password: 'password',
        name:'name',
        surname:'surname',
        email:'mail@mail.com',
        role: 'user'
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single user', async () =>
    request(app)
      .put(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .send({
        username: 'newusername',
        password: 'password',
        name:'name',
        surname:'surname',
        email:'mail@mail.com',
        role: 'user'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('username');
        expect(response.body).toHaveProperty('password');
        expect(response.body.username).toBe('newusername');
      }),
  );
});
describe('DELETE /api/v1/users/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/users/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/users/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', async () =>
    request(app)
      .delete(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect(204)
  );
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/users/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});