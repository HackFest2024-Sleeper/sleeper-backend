const { StatusCodes } = require('http-status-codes');
const {
  inputDailyFeedbacksUser,
  getAllFeedbacksUser,
  getOneFeedbackUser,
} = require('../../service/sequelize/feedbacks');

const getAllFeedbacks = async (req, res, next) => {
  try {
    const result = await getAllFeedbacksUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      size: result.total,
      page: result.pages,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getOneFeedback = async (req, res, next) => {
  try {
    const result = await getOneFeedbackUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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

module.exports = { inputDailyFeedbacks, getAllFeedbacks, getOneFeedback };
