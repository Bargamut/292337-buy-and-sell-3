'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

module.exports = (parentRouter, offerDataService) => {
  parentRouter.use(`/`, mainRouter);

  mainRouter.get(`/`, async (req, res) => {
    const offers = await offerDataService.findAll();

    res.render(`main`, offers);
  });
  mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
  mainRouter.get(`/login`, (req, res) => res.render(`login`));
  mainRouter.get(`/search`, (req, res) => res.render(`search-result`));
};
