const { celebrate, Joi } = require('celebrate');

const userValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userUpdateValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  userValidator,
  userUpdateValidator,
  userLoginValidator,
};
