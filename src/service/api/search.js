'use strict';

const {Router} = require(`express`);

const searchValidator = require(`../middlewares/search-validator`);

const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (parentRouter, searchService) => {
  parentRouter.use(`/search`, route);

  route.get(`/`, searchValidator, (req, res) => {
    const {query} = req.query;
    const offers = searchService.findBy(query);

    return res
      .status(HttpCode.OK)
      .json(offers);
  });
};

