'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActivityRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActivityRecommendation.init(
    {
      activities: DataTypes.ARRAY(DataTypes.STRING),
      date: DataTypes.DATEONLY,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ActivityRecommendation',
    }
  );
  return ActivityRecommendation;
};
