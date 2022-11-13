const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const isDate = require('validator/lib/isDate');

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
      message: 'Ссылка не корректна',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Ссылка не корректна',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Ссылка не корректна',
    },
  },

  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // id фильма
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
