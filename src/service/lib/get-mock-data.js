'use strict';

const fs = require(`fs`).promises;

const {MOCK_FILE_NAME} = require(`../../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME);

    data = fileContent.length > 0
      ? JSON.parse(fileContent)
      : [];
  } catch (error) {
    if (error.code === `ENOENT`) {
      data = [];
    } else {
      console.log(error);

      return Promise.reject(error);
    }
  }

  return Promise.resolve(data);
};

module.exports = {
  getMockData,
};
