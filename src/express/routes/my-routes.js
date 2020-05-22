'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

module.exports = (parentRouter, offerDataService) => {
  parentRouter.use(`/my`, myRouter);

  myRouter.get(`/`, async (req, res) => {
    const offers = await offerDataService.findAll();

    res.render(`my-tickets`, {offers});
  });

  myRouter.get(`/comments`, async (req, res) => {
    // Запросите комментарии к первым 3 публикациям с ресурса
    const offers = await offerDataService.findLast(3);

    res.render(`comments`, {offers});
  });
};
