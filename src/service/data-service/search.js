'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findBy(query) {
    const findedOffers = query.length > 0
      ? this._offers.filter((item) => item.title.includes(query))
      : [];

    return findedOffers;
  }
}

module.exports = SearchService;
