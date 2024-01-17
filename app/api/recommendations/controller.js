const { StatusCodes } = require('http-status-codes');
const {
  createActivitiesRecommendationUser,
  getActivitiesRecommendationUser,
  getExercisesRecommendationUser,
  getFoodsRecommendationUser,
} = require('../../service/sequelize/recommendations');

const createActivitiesRecommendation = async (req, res, next) => {
  try {
    const result = await createActivitiesRecommendationUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: 'CREATED',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getActivitiesRecommendation = async (req, res, next) => {
  try {
    const result = await getActivitiesRecommendationUser(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

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
  createActivitiesRecommendation,
  getActivitiesRecommendation,
  getExercisesRecommendation,
  getFoodsRecommendation,
};
