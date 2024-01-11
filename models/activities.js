'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activities.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'activities',
    }
  );
  return activities;
};
