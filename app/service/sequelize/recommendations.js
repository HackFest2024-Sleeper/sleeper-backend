const { NotFoundError, BadRequestError } = require('../../errors');

const User = require('../../../models').users;
const Activity = require('../../../models').activities;

const inputDailyActivitiesUser = async (req) => {
  const { activities, date } = req.body;
  // const { uid } = req.user;
  const uid = 'xInOmaflENWmM0STEfsS7GwWoAE3';

  const user = await User.findOne({ where: { uid } });
  if (!user) {
    throw new NotFoundError(`User with uid ${uid} was not found`);
  }

  for (const activityData of activities) {
    const [activity, created] = await Activity.findOrCreate({
      where: { name: activityData.name, date: date, UserId: user.id },
      defaults: {
        type: activityData.type,
        duration: activityData.duration,
      },
    });

    if (!created) {
      throw new BadRequestError(
        `Daily activity for ${activity.name} already filled for ${activity.date}`
      );
    }
  }

  return 'Daily Activities inputted';
};

module.exports = { inputDailyActivitiesUser };
