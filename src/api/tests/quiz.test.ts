import { response } from 'express';
import request from 'supertest';
import app from '../../app';
import { Quiz, Quizzes } from '../models/quiz.model';
beforeAll(async () => {
  try {
    await Quizzes.drop();

  } catch (error) {

  }
})
describe('GET /api/v1/quizzes', () => {
  it('responds with an array of quizzes', async () =>
    request(app)
      .get('/api/v1/quizzes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
        // expect(response.body[0]).toHaveProperty('content');
        // expect(response.body[0]).toHaveProperty('done');
      })
  );
});
describe('POST /api/v1/quizzes', () => {
  it('responds with an error if the quiz is invalid', async () =>
    request(app)
      .post('/api/v1/quizzes')
      .set('Accept', 'application/json')
      .send({
        question:'',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');

      })
  );
});
let id = '';
describe('POST /api/v1/quizzes', () => {
  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/quizzes')
      .set('Accept', 'application/json')
      .send({
        question: 'question',
        answers:[{
            answer:"answer1"
        },
        {
            answer:"answer2"
        }]
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('answers');
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body.question).toBe('question');
      })
  );
});
describe('GET /api/v1/quizzes/:id', () => {
  it('responds with a single quiz', async () =>
    request(app)
      .get(`/api/v1/quizzes/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('answers');
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body.question).toBe('question')
        // expect(response.body[0]).toHaveProperty('content');
        // expect(response.body[0]).toHaveProperty('done');
      })
  );
});

describe('PUT /api/v1/quizzes/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/quizzes/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/quizzes/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        question: 'updatedquestion',
        answers:[
            {
                answer:"answer1"
            }
        ]
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single quiz', async () =>
    request(app)
      .put(`/api/v1/quizzes/${id}`)
      .set('Accept', 'application/json')
      .send({
        question: 'updatedquestion',
        answers:[
            {
                answer:"answer1"
            }
        ]
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('question');
        expect(response.body.question).toBe('updatedquestion');
      }),
  );
});
describe('DELETE /api/v1/quizzes/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/quizzes/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/quizzes/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', async () =>
    request(app)
      .delete(`/api/v1/quizzes/${id}`)
      .set('Accept', 'application/json')
      .expect(204)
  );
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/quizzes/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});