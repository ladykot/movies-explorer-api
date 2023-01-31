const router = require('express').Router();
const { userUpdateValidator } = require('../midlewares/userValidator');

const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch(
  '/me',
  userUpdateValidator,
  updateUser,
);

module.exports = router;
