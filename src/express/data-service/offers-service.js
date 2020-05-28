'use strict';

const request = require(`request-promise-native`);

class OfferDataService {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async findAll() {
    return await request(`${this._baseUrl}/api/offers/`, {json: true});
  }

  async findLast(limit) {
    const offers = await this.findAll();

    return (offers.length > limit)
      ? offers.splice(-limit)
      : offers;
  }

  async findOne(offerId) {
    return await request(`${this._baseUrl}/api/offers/${offerId}`, {json: true});
  }

  async create(data) {
    return await request.post(
        `${this._baseUrl}/api/offers/`,
        {
          json: data,
        });
  }
}

module.exports = OfferDataService;
