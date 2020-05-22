'use strict';

const express = require(`express`);
const path = require(`path`);

const router = require(`./routes`);

const PUBLIC_DIR = `public`;
const DEFAULT_PORT = 8080;

const app = express();

// Шаблонизация
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

// middleware: Отдача статики с помощью
app.use(
    express.static(
        path.resolve(__dirname, PUBLIC_DIR)
    )
);

// Роутеры
app.use(`/`, router);

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер стартовал на http://localhost:${DEFAULT_PORT}`);
});
