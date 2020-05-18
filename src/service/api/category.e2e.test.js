'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Category API end-points`, () => {
  it(`should be 200 on GET /api/categories`, async () => {
    const res = await request(app).get(`/api/categories/`);

    expect(res.statusCode).toBe(200);
  });
});

describe(`Category API end-points negative`, () => {
  it(`should be 404 on GET /api/categories/all`, async () => {
    const res = await request(app).get(`/api/categories/all`);

    expect(res.statusCode).toBe(404);
  });
});
