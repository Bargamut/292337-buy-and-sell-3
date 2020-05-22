'use strict';

const {Router} = require(`express`);

const offersRouter = new Router();

module.exports = (parentRouter, offerDataService) => {
  parentRouter.use(`/offers`, offersRouter);

  offersRouter.get(`/add`, (req, res) => res.render(`new-ticket`));
  offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));
  offersRouter.get(`/edit/:id`, async (req, res) => {
    const {id: offerId} = req.params;

    const offer = await offerDataService.findOne(offerId);

    res.render(`ticket-edit`, offer);
  });
  offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
};
