'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const offersRouter = require(`./routes/offers-routes`);

const PUBLIC_DIR = `public`;
const DEFAULT_PORT = 8080;

const app = express();

// Шаблонизация
app.set(`views`, `./templates`);
app.set(`view engine`, `pug`);

// middleware: Отдача статики с помощью
app.use(
    express.static(
        path.resolve(__dirname, PUBLIC_DIR)
    )
);

// Роутеры
app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);

app.listen(DEFAULT_PORT, () => {
  console.log(`Сервер стартовал на http://localhost:${DEFAULT_PORT}`);
});
