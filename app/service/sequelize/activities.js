const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').User;
const Activity = require('../../../models').Activity;

const inputDailyActivitiesUser = async (req) => {
  const { name, duration, priority, date, time } = req.body;
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await Activity.create({
    UserId: user.id,
    name: name,
    duration: duration,
    priority: priority,
    date: date,
    time: time,
  });

  return result;
};

const getAllDailyActivitiesUser = async (req) => {
  const { page = 1, limit = 10 } = req.query;
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const whereClause = { UserId: user.id };

  if (req.query.date) {
    whereClause = {
      date: date,
    };
  }

  const result = await Activity.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    where: whereClause,
    attributes: ['id', 'name', 'duration', 'priority', 'date', 'time'],
    order: [
      ['date', 'DESC'],
      ['time', 'DESC'],
    ],
  });

  return {
    data: result.rows,
    pages: Math.ceil(result.count / limit),
    total: result.count,
  };
};

const getOneDailyActivitiesUser = async (req) => {
  // const { uid } = req.user;
  const uid = 'S5Kkhk64eEY4zgWRoKiB2uZsMw72';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  const result = await Activity.findOne({
    where: { UserId: user.id },
    attributes: ['id', 'name', 'duration', 'priority', 'date', 'time'],
    order: [['time', 'DESC']],
  });
};

module.exports = {
  inputDailyActivitiesUser,
  getAllDailyActivitiesUser,
  getOneDailyActivitiesUser,
};
