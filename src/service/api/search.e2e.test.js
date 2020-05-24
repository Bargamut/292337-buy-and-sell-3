'use strict';

const request = require(`supertest`);
const {app} = require(`../cli/server`);

describe(`Search API end-points`, () => {
  it.each([
    [200, `/api/search?query=`],
    [200, `/api/search?query=123`],
    [200, `/api/search?query=нов`],
    [200, `/api/search?query=отлич`],
  ])(`should be %i on GET %s`, async (expected, query) => {
    const res = await request(app).get(encodeURI(query));

    expect(res.statusCode).toBe(expected);
  });
});

describe(`Search API end-points negative`, () => {
  it.each([
    [400, `/api/search`],
    [400, `/api/search?q=`],
    [404, `/api/search%query=`],
  ])(`should be %i on GET %s`, async (expected, query) => {
    const res = await request(app).get(encodeURI(query));

    expect(res.statusCode).toBe(expected);
  });
});
