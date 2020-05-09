'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  HttpCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;


const onClientConect = async (req, res) => {
  const notFoundMessageText = `Not found`;

  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks
          .map((post) => `<li>${post.title}</li>`)
          .join(` `);

        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (error) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    createServer(port);
  },
};
