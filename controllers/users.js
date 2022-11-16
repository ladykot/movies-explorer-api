const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found_404');
const { NOT_FOUND_MESSAGE } = require('../utils/constants');
const BadRequestError = require('../errors/bad_req_400');
const { BAD_REQUEST_MESSAGE } = require('../utils/constants');
const ConflictError = require('../errors/conflict_409');
const { CONFLICT_ERROR_MESSAGE } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized_401');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const { OK_CODE } = require('../utils/constants');
const { SALT } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

// функции-обработчики роутов:

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body; // кладем в body запроса данные пользователя
  // валидация поля email уже в роутере

  // хешируем пароль
  bcrypt
    .hash(password, SALT)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError(CONFLICT_ERROR_MESSAGE),
        );
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(BAD_REQUEST_MESSAGE),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictError(CONFLICT_ERROR_MESSAGE),
        );
      }
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError(BAD_REQUEST_MESSAGE));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError(UNAUTHORIZED_MESSAGE));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        );
        return res.status(OK_CODE).send({ token });
      });
    })
    .catch(next);
};
