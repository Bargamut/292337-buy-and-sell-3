'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Offer API end-points`, () => {
  it(`should be 200 on GET /api/offers`, async () => {
    const res = await request(app).get(`/api/offers`);

    expect(res.status).toBe(200);
  });

  it(`should be 201 on POST /api/offers`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .set(`Content-Type`, `application/json`)
      .send({
        id: `test-id`,
        category: [`Тест`],
        description: `Тест поста по POST-запросу`,
        picture: `item04.jpg`,
        title: `Тест создания поста.`,
        type: `offer`,
        sum: 42420,
      });

    expect(res.status).toBe(201);
  });

  it(`should be 200 on GET /api/offers/test-id`, async () => {
    const res = await request(app).get(`/api/offers/test-id`);

    expect(res.status).toBe(200);
  });

  it(`should be 200 PUT on /api/offers/test-id`, async () => {
    const res = await request(app)
      .put(`/api/offers/test-id`)
      .set(`Content-Type`, `application/json`)
      .send({
        category: [`Тест`, `Тест2`],
        description: `Тест обновления по PUT-запросу`,
        picture: `item01.jpg`,
        title: `Тест обновления поста.`,
        type: `offer`,
        sum: 97977
      });

    expect(res.status).toBe(200);
  });

  it(`should be 200 on DELETE /api/offers/test-id`, async () => {
    const res = await request(app).delete(`/api/offers/test-id`);

    expect(res.status).toBe(200);
  });
});

describe(`Offer API end-points negative`, () => {
  it(`should be 404 on GET /api/offers/all`, async () => {
    const res = await request(app).get(`/api/offers/all`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on GET /api/offers/123`, async () => {
    const res = await request(app).get(`/api/offers/123`);

    expect(res.status).toBe(404);
  });

  it(`should be 400 on POST /api/offers`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .set(`Content-Type`, `application/json`)
      .send({
        category: [`Негативный тест`],
        description: `Тест некорректного создания поста по POST-запросу`,
        title: `Тест создания поста без картинки и типа.`,
        sum: 42420
      });

    expect(res.status).toBe(400);
  });

  it(`should be 404 on PUT /api/offers/123`, async () => {
    const res = await request(app)
      .put(`/api/offers/123`)
      .set(`Content-Type`, `application/json`)
      .send({
        category: [`Тест`, `Тест2`],
        description: `Тест обновления несуществующего по PUT-запросу`,
        picture: `item01.jpg`,
        title: `Тест обновления несуществующего поста.`,
        type: `offer`,
        sum: 97977
      });

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/offers/123`, async () => {
    const res = await request(app).delete(`/api/offers/123`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/offers`, async () => {
    const res = await request(app).delete(`/api/offers`);

    expect(res.status).toBe(404);
  });
});
