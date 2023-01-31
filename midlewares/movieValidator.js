const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/url-pattern');

const movieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.date().required(), // нужно уточнить
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().pattern(urlPattern),
    trailerLink: Joi.string().required().pattern(urlPattern),
    thumbnail: Joi.string().required().pattern(urlPattern),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  movieValidator,
  movieIdValidator,
};
