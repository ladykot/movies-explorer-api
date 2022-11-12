const BadRequestError = require('../errors/bad_req_400');
const NotFoundError = require('../errors/not-found_404');
const ForbittenError = require('../errors/forbidden_403');

const Movie = require('../models/movie');

// обработчики роутов

// добавить фильм
module.exports.addMovie = (req, res, next) => {
  // eslint-disable-next-line max-len
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  // что в user?
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные для фильма переданы некорректно'));
      } else {
        next(err);
      }
    });
};

// Найти и вернуть все сохраненные у user фильмы
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ movies }))
    .catch(next);
};

// Удалить фильм
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.userId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbittenError('Вы не можете удалить чужой фильм');
      }
      return movie.remove().then(() => res.send({ movie, message: 'Успешно удален фильм:' }));
      // возможно так: return Movie.findByIdAndRemove(movie._id);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Не корректный id'));
      }
      return next(err);
    });
};
