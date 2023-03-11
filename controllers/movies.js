const BadRequestError = require('../errors/bad_req_400');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');
const NotFoundError = require('../errors/not-found_404');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');
const ForbittenError = require('../errors/forbidden_403');
const { FORBIDDEN_URL_MESSAGE } = require('../utils/constants');

const Movie = require('../models/movie');

// обработчики роутов

// добавить фильм
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_MESSAGE));
      } else {
        next(err);
      }
    });
};

// Найти и вернуть все сохраненные у user фильмы
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

// Удалить фильм
module.exports.deleteMovie = (req, res, next) => {
  // console.log(`req.params.movieId = ${req.params.movieId}`);
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      // console.log('movie.owner:', movie.owner);
      if (!movie.owner.equals(userId)) {
        throw new ForbittenError(FORBIDDEN_URL_MESSAGE);
      }
      return Movie.findByIdAndRemove({ _id: movieId });
    })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};
