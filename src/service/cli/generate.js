'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
  addZero,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/setences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

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

const generateOffers = (count, titles, categories, setences) => {
  return Array(count).fill().map(() => ({
    category: getCategories(categories),
    description: getDescription(setences),
    picture: getPictureFileName(),
    title: getTitle(titles),
    type: getOfferType(),
    sum: getOfferSum(),
  }));
};

const saveToMocks = async (content) => {
  try {
    await fs.writeFile(FILE_NAME, content);

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
    return content.split(`\n`);
  } catch (err) {
    console.error(
        chalk.red(err)
    );
    return [];
  }
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const titles = readContent(FILE_TITLES_PATH);
    const categories = readContent(FILE_CATEGORIES_PATH);
    const sentences = readContent(FILE_SENTENCES_PATH);

    const content = JSON.stringify(
        generateOffers(
            countOffer,
            titles,
            categories,
            sentences
        )
    );

    saveToMocks(content);
  }
};
