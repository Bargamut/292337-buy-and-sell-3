'use strict';

module.exports = (logger) => (req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);

  // Light alternative express-pino-logger middleware
  res.on(`finish`, () => {
    logger.info(`End request with ${res.statusCode} to url ${req.originalUrl}`);
  });

  next();
};

