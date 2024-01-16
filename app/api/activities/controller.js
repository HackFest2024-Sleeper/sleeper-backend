const { StatusCodes } = require('http-status-codes');
const {
  inputDailyActivitiesUser,
  getAllDailyActivitiesUser,
  getOneDailyActivitiesUser,
} = require('../../service/sequelize/activities');

const inputDailyActivities = async (req, res, next) => {
  try {
    const result = await inputDailyActivitiesUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllDailyActivities = async (req, res, next) => {
  try {
    const result = await getAllDailyActivitiesUser(req);

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

const getOneDailyActivities = async (req, res, next) => {
  try {
    const result = await getOneDailyActivitiesUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  inputDailyActivities,
  getAllDailyActivities,
  getOneDailyActivities,
};
