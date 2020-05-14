'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {commentId} = req.params;
  const {offer} = res.locals;
  const comment = service.findOne(commentId, offer);

  if (!comment) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`Offer with ${commentId} not found`);
  }

  res.locals.comment = comment;

  return next();
};
