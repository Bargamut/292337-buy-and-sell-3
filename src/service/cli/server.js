'use strict';

const fs = require(`fs`);
const http = require(`http`);
const chalk = require(`chalk`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

const onClientConect = (req, res) => {};

const createServer = (port) => {
  http.createServer(onClientConect)
    .listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(
          chalk.green(`Ожидаю соединений на ${port}`)
      );
    });
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    createServer(port);
  },
};
