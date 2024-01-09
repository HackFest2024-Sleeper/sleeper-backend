'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  histories.init(
    {
      UserId: DataTypes.STRING,
      foods: DataTypes.ARRAY(DataTypes.STRING),
      exercises: DataTypes.ARRAY(DataTypes.STRING),
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'histories',
    }
  );
  return histories;
};