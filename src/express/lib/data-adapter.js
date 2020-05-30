'use strict';

const adapter = (data) => {
  return {
    category: data.category.map((item) => parseInt(item, 10)),
    description: data.comment,
    picture: data.avatar.name || ``,
    title: data[`ticket-name`],
    type: data.action,
    sum: parseInt(data.price, 10),
  };
};

module.exports = adapter;
