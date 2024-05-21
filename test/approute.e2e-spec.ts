import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';

describe('MoviesController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a movie', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({ title: 'Test Movie', year: 2022 })
      .expect(201);
  });

  it('should get all movies', () => {
    return request(app.getHttpServer())
      .get('/movies')
      .expect(200);
  });

  it('should get a movie by id', () => {
    return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
  });

  it('should update a movie by id', () => {
    return request(app.getHttpServer())
      .patch('/movies/1')
      .send({ title: 'Updated Movie' })
      .expect(200);
  });

  it('should delete a movie by id', () => {
    return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
  });
});
