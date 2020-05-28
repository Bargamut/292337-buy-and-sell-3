'use strict';

const {Router} = require(`express`);
const {
  ALLOWED_FILE_TYPES,
} = require(`../../constants`);

const offersRouter = new Router();

module.exports = (parentRouter, offerDataService, processDataMiddleware) => {
  parentRouter.use(`/offers`, offersRouter);

  offersRouter.get(`/add`, (req, res) => {
    res.render(`new-ticket`, {
      allowedFileTypes: ALLOWED_FILE_TYPES,
    });
  });
  offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));
  offersRouter.get(`/edit/:id`, async (req, res) => {
    const {id: offerId} = req.params;

    const offer = await offerDataService.findOne(offerId);

    res.render(`ticket-edit`, {offer});
  });
  offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

  offersRouter.post(`/add`, processDataMiddleware, async (req, res) => {
    const {data: offer} = res.locals;

    try {
      await offerDataService.create(offer);

      res.redirect(`/my`);
    } catch (error) {
      res.render(`new-ticket`, {
        allowedFileTypes: ALLOWED_FILE_TYPES,
        offer,
      });
    }
  });
};
