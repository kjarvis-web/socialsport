const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config');

const app = express();

const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
// const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((e) => {
    logger.error('error: ', e.message);
  });

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
