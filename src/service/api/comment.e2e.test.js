'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Comment API end-points`, () => {
  it(`should be 200 on GET /api/offers/8-ISnn/comments`, async () => {
    const res = await request(app).get(`/api/offers/8-ISnn/comments`);

    expect(res.status).toBe(200);
  });

  it(`should be 201 on POST /api/offers/8-ISnn/comments`, async () => {
    const res = await request(app)
      .post(`/api/offers/8-ISnn/comments`)
      .set(`Content-Type`, `application/json`)
      .send({
        id: `test-comment`,
        text: `Тест создания комментария.`
      });

    expect(res.status).toBe(201);
  });

  it(`should be 200 on DELETE /api/offers/8-ISnn/comments/test-comment`, async () => {
    const res = await request(app).delete(`/api/offers/8-ISnn/comments/test-comment`);

    expect(res.status).toBe(200);
  });
});

describe(`Comment API end-points negative`, () => {
  it(`should be 404 on GET /api/offers/123/comments`, async () => {
    const res = await request(app).get(`/api/offers/123/comments`);

    expect(res.status).toBe(404);
  });

  it(`should be 400 on POST /api/offers/8-ISnn/comments`, async () => {
    const res = await request(app)
      .post(`/api/offers/8-ISnn/comments`)
      .set(`Content-Type`, `application/json`)
      .send({
        id: `test-comment`,
        name: `Тест некорректного создания комментария.`,
      });

    expect(res.status).toBe(400);
  });

  it(`should be 404 on PUT /api/offers/8-ISnn/comments/test-comment`, async () => {
    const res = await request(app)
      .put(`/api/offers/8-ISnn/comments/test-comment`)
      .set(`Content-Type`, `application/json`)
      .send({
        name: `Тест некорректного обновления комментария.`,
      });

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/offers/123/comments/test-comment`, async () => {
    const res = await request(app).get(`/api/offers/123/comments/test-comment`);

    expect(res.status).toBe(404);
  });

  it(`should be 404 on DELETE /api/offers/8-ISnn/comments/test-comment`, async () => {
    const res = await request(app).get(`/api/offers/8-ISnn/comments/test-comment`);

    expect(res.status).toBe(404);
  });
});
