'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exercises extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  exercises.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      duration: DataTypes.STRING,
      repetitions: DataTypes.INTEGER,
      sets: DataTypes.INTEGER,
      video: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'exercises',
    }
  );
  return exercises;
};