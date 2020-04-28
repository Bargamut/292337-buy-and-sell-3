'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  addZero,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const TITLES = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`,
];
const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.,`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`,
];
const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};
const SumRestrict = {
  min: 1000,
  max: 100000,
};
const PictureRestrict = {
  min: 1,
  max: 16,
};

const getPictureFileName = () => {
  const imgIndex = getRandomInt(PictureRestrict.min, PictureRestrict.max);

  return `item${addZero(imgIndex)}.jpg`;
};

const getCategories = () => {
  return Array(getRandomInt(1, CATEGORIES.length))
    .fill()
    .map(() => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]);
};

const getDescription = () => shuffle(SENTENCES).slice(1, 5).join(` `);

const getTitle = () => TITLES[getRandomInt(0, TITLES.length - 1)];

const getOfferType = () => {
  const typeValues = Object.values(OfferType);
  const typeIndex = getRandomInt(0, Object.keys(OfferType).length - 1);

  return typeValues[typeIndex];
};

const getOfferSum = () => getRandomInt(SumRestrict.min, SumRestrict.max);

const generateOffers = (count) => {
  return Array(count).fill().map(() => ({
    category: getCategories(),
    description: getDescription(),
    picture: getPictureFileName(),
    title: getTitle(),
    type: getOfferType(),
    sum: getOfferSum(),
  }));
};

const saveToMocks = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(
          chalk.red(`Can't write data to file...`)
      );
    }

    return console.info(
        chalk.green(`Operation success. File created.`)
    );
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    saveToMocks(content);
  }
};
