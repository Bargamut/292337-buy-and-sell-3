'use strict';

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  findAll(offer) {
    return offer.comments;
  }

  findOne(id, offer) {
    return offer.comments.find((item) => item.id === id);
  }

  create(comment, offer) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
    }, comment);

    offer.comments.push(newComment);

    return newComment;
  }

  drop(id, offer) {
    const comment = offer.comments.find((item) => item.id === id);

    if (!comment) {
      return null;
    }

    offer.comments = offer.comments.filter((item) => item.id !== id);

    return comment;
  }
}

module.exports = CommentService;
