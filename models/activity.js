'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Activity.belongsTo(models.User);
      Activity.belongsToMany(models.Feedback, {
        through: models.FeedbackActivity,
      });
    }
  }
  Activity.init(
    {
      name: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      time: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Activity',
    }
  );
  return Activity;
};
