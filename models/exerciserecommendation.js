'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseRecommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ExerciseRecommendation.belongsTo(models.Exercise);
    }
  }
  ExerciseRecommendation.init(
    {
      UserId: DataTypes.INTEGER,
      ExerciseId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'ExerciseRecommendation',
    }
  );
  return ExerciseRecommendation;
};
