const { StatusCodes } = require('http-status-codes');
const { updateSmartLampStatus } = require('../../service/sequelize/devices');

const updateSmartLamp = async (req, res, next) => {
  try {
    const result = await updateSmartLampStatus(req);

    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      msg: 'OK',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateSmartLamp };
