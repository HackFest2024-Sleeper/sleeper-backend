'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foodrecommendations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  foodrecommendations.init(
    {
      UserId: DataTypes.INTEGER,
      FoodId: DataTypes.INTEGER,
      datetime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'foodrecommendations',
    }
  );
  return foodrecommendations;
};
