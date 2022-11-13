const bcrypt = require('bcrypt'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found_404');
const BadRequestError = require('../errors/bad_req_400');
const ConflictError = require('../errors/conflict_409');
const User = require('../models/user');
const { SALT } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized_401');

const { JWT_SECRET, NODE_ENV } = process.env;

// функции-обработчики роутов:

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body; // кладем в body запроса данные
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
          new ConflictError('Пользователь с таким email уже существует'),
        );
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Данные переданы некорректно'));
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
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(
          new BadRequestError('The information you provided is not correct'),
        );
      }
      if (err.kind === 'ObjectId') {
        return next(new BadRequestError('Id is not correct'));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
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
        throw new UnauthorizedError('Неверный логин или пароль');
      }
      bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new UnauthorizedError('Неверный логин или пароль'));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        );
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};
