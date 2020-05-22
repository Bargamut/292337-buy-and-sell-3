'use strict';

class CommentDataService {
  set offerDataService(service) {
    this._offerDataService = service;
  }

  async findAll(offers) {
    if (!offers) {
      return [];
    }

    const comments = offers.reduce((acc, offer) => {
      acc.add(offer.comments);

      return acc;
    }, new Set());

    return comments;
  }
}

module.exports = CommentDataService;
