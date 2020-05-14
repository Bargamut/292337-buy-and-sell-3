'use strict';

const {Router} = require(`express`);

const offerValidator = require(`../middlewares/offer-validator`);
const offerExist = require(`../middlewares/offer-exist`);
const commentValidator = require(`../middlewares/comment-validator`);
const commentExist = require(`../middlewares/comment-exist`);

const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (parentRouter, offerService, commentService) => {
  parentRouter.use(`/offers`, route);

  route.get(`/`, async (req, res) => {
    const offers = offerService.findAll();

    return res
      .status(HttpCode.OK)
      .json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`Not found with ${offerId}`);
    }

    return res
      .status(HttpCode.OK)
      .send(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const offer = offerService.create(req.body);

    return res
      .status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offerId} = req.params;
    const updatedOffer = offerService.update(offerId, req.body);

    return res
      .status(HttpCode.OK)
      .json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);

    return res
      .status(HttpCode.OK)
      .json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res
      .status(HttpCode.OK)
      .json(comments);
  });

  route.post(`/:offerId/comments`, [commentValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(req.body, offer);

    return res
      .status(HttpCode.CREATED)
      .json(comment);
  });

  route.delete(`/:offerId/comments/:commentId`, [offerExist(offerService), commentExist(commentService)], (req, res) => {
    const {offer, comment} = res.locals;
    const deletedComment = commentService.drop(comment.id, offer);

    return res
      .status(HttpCode.OK)
      .json(deletedComment);
  });
};
