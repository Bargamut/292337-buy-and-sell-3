'use strict';

const pino = require(`pino`);
const logger = pino(
    {
      name: `api-service`,
      level: process.env.LOG_LEVEL || `info`,
      prettyPrint: {
        colorize: false,
      },
    },
    pino.destination({
      dest: `src/service/logs/all-logs`,
      sync: false,
    }),
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
