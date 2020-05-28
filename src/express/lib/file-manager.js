'use strict';

const fs = require(`fs`).promises;
const pathModule = require(`path`);
const {nanoid} = require(`nanoid`);
const {
  MAX_FILENAME_LENGTH,
  ALLOWED_FILE_TYPES,
} = require(`../../constants`);

const saveFile = async (file) => {
  const {type, size, path, name} = file;
  const newName = `item_${nanoid(MAX_FILENAME_LENGTH)}${pathModule.extname(name)}`;
  const oldPath = pathModule.resolve(__dirname, path);
  const newPath = pathModule.resolve(__dirname, `../public/img/${newName}`);

  if (size === 0 || !ALLOWED_FILE_TYPES.includes(type)) {
    fs.unlink(path);

    throw new Error(`Wrong type of file or file is empty!`);
  }

  try {
    await fs.rename(oldPath, newPath);

    file.path = newPath;
    file.name = newName;
  } catch (error) {
    fs.unlink(path);

    throw new Error(`Can't save file! ${error.message}`);
  }

  return file;
};

module.exports = {
  saveFile,
};
