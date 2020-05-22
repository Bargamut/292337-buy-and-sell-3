'use strict';

const request = require(`request-promise-native`);

class CommentDataService {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  set offerDataService(service) {
    this._offerDataService = service;
  }

  async findAll(offers = []) {
    const promises = offers.map(async (offer) => {
      return await request(`${this._baseUrl}/api/offers/${offer.id}/comments`, {json: true});
    });

    return await Promise.all(promises);
  }

  async findFor(offerId) {
    return await request(`${this._baseUrl}/api/offers/${offerId}/comments`, {json: true});
  }
}

module.exports = CommentDataService;
