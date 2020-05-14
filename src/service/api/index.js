'use strict';

const {Router} = require(`express`);

const {getMockData} = require(`../lib/get-mock-data`);

const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);


const router = new Router();

(async () => {
  const mockData = await getMockData();

  category(router, new CategoryService(mockData));
  offer(router, new OfferService(mockData), new CommentService());
  search(router, new SearchService(mockData));
})();

module.exports = router;
