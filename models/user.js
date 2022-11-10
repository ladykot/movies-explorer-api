const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

// Опишем схему пользователя:
const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    default: 'Виталик', // оно должно быть у каждого пользователя
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
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
