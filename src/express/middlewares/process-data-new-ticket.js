'use strict';

const adapter = require(`../lib/data-adapter`);
const {saveFile} = require(`../lib/file-manager`);

const {ALLOWED_FILE_TYPES} = require(`../../constants`);

module.exports = async (req, res, next) => {
  try {
    req.files.avatar = await saveFile({...req.files.avatar});
  } catch (error) {
    return res.render(`new-ticket`, {
      allowedFileTypes: ALLOWED_FILE_TYPES,
      ...adapter(
          {
            ...req.fields,
            ...req.files,
          }
      ),
      error: error.message,
    });
  }

  res.locals.data = adapter(
      {
        ...req.fields,
        ...req.files,
      }
  );

  return next();
};
