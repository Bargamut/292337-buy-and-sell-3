'use strict';

class CategoryService {
  constructor() {
    this._offers = null;
  }

  set offers(data) {
    this._offers = data;
  }

  get offers() {
    return this._offers;
  }

  findAll() {
    const categories = this._offers.reduce((acc, offer) => {
      acc.add(...offer.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
