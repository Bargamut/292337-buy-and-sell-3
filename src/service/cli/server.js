'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/get-logger`);

const routes = require(`../api`);
const {
  HttpCode,
  API_PREFIX_PATH,
} = require(`../../constants`);
const DEFAULT_PORT = 3000;

const logger = getLogger();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);

  // Light alternative express-pino-logger middleware
  res.on(`finish`, () => {
    logger.info(`End request with ${res.statusCode} to url ${req.originalUrl}`);
  });

  next();
});
app.use(API_PREFIX_PATH, routes);

app.use((req, res) => {
  res
  .status(HttpCode.NOT_FOUND)
  .send(`Not Found`);

  logger.error(`End request with error ${res.statusCode} to url ${req.url}`);
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err}`);

  next();
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port, () => {
        logger.info(`Server start succes on http://localhost:${port}`);
      })
      .on(`error`, (error) => {
        logger.error(`Server start fail! ${error}`);
      });
  },
  app,
};
