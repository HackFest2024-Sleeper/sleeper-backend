const { StatusCodes } = require('http-status-codes');
const {
  getAllExercises,
  getOneExercise,
} = require('../../service/sequelize/exercises');

const getAll = async (req, res, next) => {
  try {
    const result = await getAllExercises(req);

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

const getOne = async (req, res, next) => {
  try {
    const result = await getOneExercise(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getOne };
