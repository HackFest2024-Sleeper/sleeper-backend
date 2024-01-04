const { StatusCodes } = require('http-status-codes');
const {
  registerUser,
} = require('../../service/sequelize/auth');

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req);

    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      msg: "CREATED",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register };
