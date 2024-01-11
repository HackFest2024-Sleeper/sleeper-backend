'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedbacks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedbacks.init(
    {
      UserId: DataTypes.STRING,
      foods: DataTypes.ARRAY(DataTypes.STRING),
      exercises: DataTypes.ARRAY(DataTypes.STRING),
      feedbacks: DataTypes.TEXT,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'feedbacks',
    }
  );
  return feedbacks;
};
