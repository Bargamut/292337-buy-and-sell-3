'use strict';

const {Router} = require(`express`);

const offer = require(`./offer`);
const category = require(`./category`);
const search = require(`./search`);
const {getMockData} = require(`../lib/get-mock-data`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const categoryService = new CategoryService();
const searchService = new SearchService();
const offerService = new OfferService();
const commentService = new CommentService();
const router = new Router();

let mockData = null;

router.use(`/`, async (req, res, next) => {
  if (!mockData) {
    mockData = await getMockData();

    categoryService.offers = mockData;
    searchService.offers = mockData;
    offerService.offers = mockData;
  }

  next();
});

category(router, categoryService);
search(router, searchService);
offer(router, offerService, commentService);

module.exports = router;
