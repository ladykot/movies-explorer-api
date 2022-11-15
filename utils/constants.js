const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const FORBIDDEN_URL_CODE = 403;
const FORBIDDEN_URL_MESSAGE = 'Доступ запрещен';
const BAD_REQUEST_CODE = 400;
const BAD_REQUEST_MESSAGE = 'Переданы некорректные данные';
const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'Произошла неизвестная ошибка';
const OK_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const UNAUTHORIZED_MESSAGE = 'Неверный логин или пароль';
const CONFLICT_ERROR_CODE = 409;
const CONFLICT_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const SALT = 10;
const LINK_INCORRECT = 'Ссылка не корректна';
const LIMIT_MESSAGE = 'Вы превысили число запросов по данному адресу';

module.exports = {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  SERVER_ERROR_CODE,
  OK_CODE,
  SALT,
  UNAUTHORIZED_CODE,
  NOT_FOUND_MESSAGE,
  BAD_REQUEST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  CONFLICT_ERROR_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  CONFLICT_ERROR_CODE,
  FORBIDDEN_URL_CODE,
  FORBIDDEN_URL_MESSAGE,
  LINK_INCORRECT,
  LIMIT_MESSAGE,
};
