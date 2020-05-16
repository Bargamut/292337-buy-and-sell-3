'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const routes = require(`../api`);
const {
  HttpCode,
  API_PREFIX_PATH,
} = require(`../../constants`);
const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(API_PREFIX_PATH, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not Found`)
);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, () => {
      console.log(
          chalk.green(`Сервер сартовал на http://localhost:${port}`)
      );
    });
  },
};
