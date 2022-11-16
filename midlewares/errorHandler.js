const { SERVER_ERROR_CODE } = require('../utils/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? SERVER_ERROR_CODE : err.message;
  res.status(statusCode).send({ message });
  next();
};
