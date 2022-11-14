// Установка лимита всех запросов
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1440 * 60 * 1000,
  max: 500,
  message: 'Вы превысили число запросов по данному адресу',
});

module.exports = limiter;
