// Роуты

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/url-pattern');

const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// все фильмы сохраненные пользователем
router.get('/', getMovies); // endpoint

// создание фильма
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(30),
      director: Joi.string().required().min(2).max(30),
      duration: Joi.string().required().min(2).max(30),
      year: Joi.date().required(), // нужно уточнить
      nameRU: Joi.string().required().min(2).max(30),
      nameEN: Joi.string().required().min(2).max(30),
      image: Joi.string().required().pattern(urlPattern),
      trailerLink: Joi.string().required().pattern(urlPattern),
      thumbnail: Joi.string().required().pattern(urlPattern),
    }),
  }),
  addMovie,
);

// удаление фильма
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
