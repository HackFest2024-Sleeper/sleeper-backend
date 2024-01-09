const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

const authRouter = require('./app/api/auth/router');
const foodsRouter = require('./app/api/foods/router');
const exercisesRouter = require('./app/api/exercises/router');
const feedbacksRouter = require('./app/api/feedbacks/router');

const errorHandlerMiddleware = require('./app/middlewares/handle-error');
const notFoundMiddleware = require('./app/middlewares/not-found');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    msg: 'Welcome to API Sleeper',
    data: {},
  });
});

app.use('/api', authRouter);
app.use('/api', foodsRouter);
app.use('/api', exercisesRouter);
app.use('/api', feedbacksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
