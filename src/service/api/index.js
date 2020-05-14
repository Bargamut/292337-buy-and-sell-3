'use strict';

const {Router} = require(`express`);

const {getMockData} = require(`../lib/get-mock-data`);

const category = require(`./category`);

const {
  CategoryService
} = require(`../data-service`);


const router = new Router();

(async () => {
  const mockData = await getMockData();

  category(router, new CategoryService(mockData));
})();

module.exports = router;
