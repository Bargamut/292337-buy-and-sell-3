'use strict';

const {HttpCode} = require(`../../constants`);

const searchKeys = [
  `query`,
];

module.exports = (req, res, next) => {
  const query = req.query;
  const keys = Object.keys(query);
  const keysExist = searchKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad Request`);
  }

  return next();
};
