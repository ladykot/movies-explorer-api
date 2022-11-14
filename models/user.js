const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

// Опишем схему пользователя:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    // minlength: 2,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    select: false, // пароль не будет возвращаться из базы
  },
}, { toObject: { useProjection: true }, toJSON: { useProjection: true } });

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
