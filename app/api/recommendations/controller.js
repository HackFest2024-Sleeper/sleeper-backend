const { StatusCodes } = require('http-status-codes');
const {
  getExercisesRecommendationUser,
  getFoodsRecommendationUser,
} = require('../../service/sequelize/recommendations');

const getExercisesRecommendation = async (req, res, next) => {
  try {
    const result = await getExercisesRecommendationUser(req);

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

const getFoodsRecommendation = async (req, res, next) => {
  try {
    const result = await getFoodsRecommendationUser(req);

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

module.exports = {
  getExercisesRecommendation,
  getFoodsRecommendation,
};
