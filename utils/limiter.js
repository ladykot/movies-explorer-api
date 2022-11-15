// Установка лимита всех запросов
const rateLimit = require('express-rate-limit');
const { LIMIT_MESSAGE } = require('./constants');

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000,
  max: 500,
  message: LIMIT_MESSAGE,
});

module.exports = limiter;
