'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exerciserecommendations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exerciserecommendations.init(
    {
      UserId: DataTypes.INTEGER,
      ExerciseId: DataTypes.INTEGER,
      datetime: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'exerciserecommendations',
    }
  );
  return exerciserecommendations;
};
