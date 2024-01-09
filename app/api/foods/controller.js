const { StatusCodes } = require('http-status-codes');
const { getAllFoods, getOneFood } = require('../../service/sequelize/foods');

const getAll = async (req, res, next) => {
  try {
    const result = await getAllFoods(req);

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
    const result = await getOneFood(req);

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
