const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

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
    equire: true,
  },

  year: {
    type: String,
    equire: true,
  },

  description: {
    type: String,
    equire: true,
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

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // id пользователя
    required: true,
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', movieSchema);
