const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const { LINK_INCORRECT } = require('../utils/constants');

// Опишем схему карточки фильма:
const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    require: true,
  },

  director: {
    type: String,
    require: true,
  },

  duration: {
    type: Number,
    require: true,
  },

  year: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: LINK_INCORRECT,
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: LINK_INCORRECT,
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: LINK_INCORRECT,
    },
  },

  nameRU: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },

  nameEN: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  // id фильма
  movieId: {
    type: Number, // число!
    required: true,
    ref: 'user',
  },
  // _id пользователя, который сохранил фильма
  owner: {
    type: mongoose.Schema.Types.ObjectId, // сюда запишется ссылка на создателя карточки
    required: true,
    ref: 'user',
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
