const router = require('express').Router();

const {
  movieValidator,
  movieIdValidator,
} = require('../midlewares/movieValidator');
const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies); // endpoint
router.delete('/:movieId', movieIdValidator, deleteMovie);
router.post('/', movieValidator, addMovie);

module.exports = router;
