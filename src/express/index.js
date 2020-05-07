'use strict';

const express = require(`express`);

const PORT = 8080;

const app = express();

app.listen(PORT, () => {
  console.log(`Сервер стартовал на http://localhost:${PORT}`);
});
