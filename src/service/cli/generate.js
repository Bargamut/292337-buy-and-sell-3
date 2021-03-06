'use strict';

const fs = require(`fs`).promises;
const {DateTime} = require(`luxon`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  getRandomInt,
  shuffle,
  addZero,
} = require(`../../utils`);
const {
  MAX_ID_LENGTH,
  MOCK_FILE_NAME,
} = require(`../../constants`);

const MOCK_DEFAULT_COUNT = 1;
const MOCK_MAX_COMMENTS = 7;
const MOCK_FILE_TITLES_PATH = `./data/titles.txt`;
const MOCK_FILE_SENTENCES_PATH = `./data/sentences.txt`;
const MOCK_FILE_CATEGORIES_PATH = `./data/categories.txt`;
const MOCK_FILE_COMMENTS_PATH = `./data/comments.txt`;

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

const getUniqId = () => nanoid(MAX_ID_LENGTH);

const getItemCreatedDate = () => {
  const maxTimestamp = Date.now();
  const minTimestamp = DateTime.local().minus({months: 3}).toMillis();

  return getRandomInt(minTimestamp, maxTimestamp);
  // return DateTime
  //   .fromMillis(getRandomInt(minTimestamp, maxTimestamp))
  //   .toFormat(`yyyy-MM-dd HH:mm:ss`);
};

const getPictureFileName = () => {
  const imgIndex = getRandomInt(PictureRestrict.min, PictureRestrict.max);

  return `item${addZero(imgIndex)}.jpg`;
};

const getCategories = (categories) => {
  return Array(getRandomInt(1, categories.length))
    .fill()
    .map(() => categories[getRandomInt(0, categories.length - 1)]);
};

const getDescription = (setences) => shuffle(setences).slice(1, 5).join(` `);

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getOfferType = () => {
  const typeValues = Object.values(OfferType);
  const typeIndex = getRandomInt(0, Object.keys(OfferType).length - 1);

  return typeValues[typeIndex];
};

const getOfferSum = () => getRandomInt(SumRestrict.min, SumRestrict.max);

const getAvatarFileName = () => {
  const imgIndex = getRandomInt(PictureRestrict.min, PictureRestrict.max);

  return `avatar${addZero(imgIndex)}.jpg`;
};

const generateAvatar = () => {
  const authorNames = [
    `Александр Бурый`,
    `Иван Таранов`,
    `Парад Дебилов`,
    `Склад Самоваров`,
    `Мятеж Комаров`,
  ];

  return authorNames[getRandomInt(0, authorNames.length)];
};

const generateComments = (count, comments) => (
  Array(count).fill().map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    author: {
      avatar: getAvatarFileName(),
      name: generateAvatar(),
    },
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, setences, comments) => {
  return Array(count).fill().map(() => ({
    id: getUniqId(),
    createdDate: getItemCreatedDate(),
    category: getCategories(categories),
    description: getDescription(setences),
    picture: getPictureFileName(),
    title: getTitle(titles),
    type: getOfferType(),
    sum: getOfferSum(),
    comments: generateComments(getRandomInt(1, MOCK_MAX_COMMENTS), comments),
  }));
};

const saveToMocks = async (content) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, content);

    console.info(
        chalk.green(`Operation success. File created.`)
    );
  } catch (error) {
    console.error(
        chalk.red(`Can't write data to file...`)
    );
  }
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);

    return content.split(`\n`).filter((value) => value !== ``);
  } catch (err) {
    console.error(
        chalk.red(err)
    );

    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || MOCK_DEFAULT_COUNT;

    const titles = await readContent(MOCK_FILE_TITLES_PATH);
    const categories = await readContent(MOCK_FILE_CATEGORIES_PATH);
    const sentences = await readContent(MOCK_FILE_SENTENCES_PATH);
    const comments = await readContent(MOCK_FILE_COMMENTS_PATH);

    const content = JSON.stringify(
        generateOffers(
            countOffer,
            titles,
            categories,
            sentences,
            comments
        )
    );

    saveToMocks(content);
  }
};
