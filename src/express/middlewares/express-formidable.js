'use strict';

const formidable = require(`formidable`);

const parse = (opts, events) => {
  return (req, res, next) => {
    if (req.expressFormidable && req.expressFormidable.parsed) {
      next();
      return;
    }

    const form = new formidable.IncomingForm();
    Object.assign(form.options, opts);

    form.uploadDir = form.uploaddir = form.options.uploadDir;

    let manageOnError = false;
    if (events) {
      events.forEach((e) => {
        manageOnError = manageOnError || e.event === `error`;
        form.on(e.event, (...parameters) => {
          e.action(req, res, next, ...parameters);
        });
      });
    }

    if (!manageOnError) {
      form.on(`error`, (err) => {
        next(err);
      });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      Object.assign(req, {
        fields,
        files,
        expressFormidable: {
          parsed: true,
        }
      });
      next();
    });
  };
};

module.exports = parse;
exports.parse = parse;
