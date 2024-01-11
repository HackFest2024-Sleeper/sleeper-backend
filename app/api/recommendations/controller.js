const { StatusCodes } = require('http-status-codes');
const {
  inputDailyActivitiesUser,
} = require('../../service/sequelize/recommendations');

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

module.exports = { inputDailyActivities };
