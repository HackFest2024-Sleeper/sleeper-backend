const { StatusCodes } = require('http-status-codes');
const { getAllFoods } = require('../../service/sequelize/foods');

const getAll = async (req, res, next) => {
  try {
    const result = await getAllFoods(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.OK,
      msg: "OK",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll };
