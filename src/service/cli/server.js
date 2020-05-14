'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const {getMockData} = require(`../lib/get-mock-data`);

const {
  HttpCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const data = await getMockData();

    res.json(data);
  } catch (error) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(error);
  }
});

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
