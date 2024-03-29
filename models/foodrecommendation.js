'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      FoodRecommendation.belongsTo(models.User);
      FoodRecommendation.belongsTo(models.Food);
    }
  }
  FoodRecommendation.init(
    {
      UserId: DataTypes.INTEGER,
      FoodId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'FoodRecommendation',
    }
  );
  return FoodRecommendation;
};
