'use strict';

class SearchService {
  constructor() {
    this._offers = null;
  }

  set offers(data) {
    this._offers = data;
  }

  get offers() {
    return this._offers;
  }

  findBy(query) {
    const findedOffers = query.length > 0
      ? this._offers.filter((item) => item.title.includes(query))
      : [];

    return findedOffers;
  }
}

module.exports = SearchService;
