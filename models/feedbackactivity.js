'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeedbackActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeedbackActivity.belongsTo(models.Feedback);
      FeedbackActivity.belongsTo(models.Activity);
    }
  }
  FeedbackActivity.init(
    {
      FeedbackId: DataTypes.INTEGER,
      ActivityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FeedbackActivity',
    }
  );
  return FeedbackActivity;
};
