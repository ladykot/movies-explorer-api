const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), updateUser);

// router.get('/:userId', celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().length(24).hex().required(),
//   }),
// }), getUser);

module.exports = router;
