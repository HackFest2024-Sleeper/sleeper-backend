const { StatusCodes } = require('http-status-codes');
const {
  inputDailyFeedbacksUser,
} = require('../../service/sequelize/feedbacks');

const inputDailyFeedbacks = async (req, res, next) => {
  try {
    const result = await inputDailyFeedbacksUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { inputDailyFeedbacks };
