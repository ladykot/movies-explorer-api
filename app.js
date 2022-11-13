require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const NotFoundError = require('./errors/not-found_404');
const { errorHandler } = require('./midlewares/errorHandler');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); // проставляем заголовки безопасности

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb');

app.use(requestLogger); // подключаем логгер запросов

// обработка несуществующих адресов
app.all('*', (req, res, next) => {
  next(new NotFoundError('Страницца не найдена'));
});

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
