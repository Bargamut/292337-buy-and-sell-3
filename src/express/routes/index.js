'use strict';

const {Router} = require(`express`);

const mainRouter = require(`./main-routes`);
const myRouter = require(`./my-routes`);
const offersRouter = require(`./offers-routes`);

const OfferDataService = require(`../data-service/offers-service`);

const processDataMiddleware = require(`../middlewares/process-data-new-ticket`);

const router = new Router();

const url = `http://localhost:3000`;

const offerDataService = new OfferDataService(url);

mainRouter(router, offerDataService);
offersRouter(router, offerDataService, processDataMiddleware);
myRouter(router, offerDataService);

module.exports = router;
