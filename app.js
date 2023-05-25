require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { errorHandler } = require('./midlewares/errorHandler');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const router = require('./routes/index');
const limiter = require('./utils/limiter');

const { DATA_BASE, NODE_ENV, LOCAL_DB } = process.env;
const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(
  NODE_ENV === 'production' ? DATA_BASE : LOCAL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(cors({
  origin: 'https://movies-explorer-ladykot.netlify.app',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); // проставляем заголовки безопасности

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
