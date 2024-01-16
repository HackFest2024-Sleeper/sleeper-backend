'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FeedbackActivities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      FeedbackId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Feedbacks',
          key: 'id',
        },
      },
      ActivityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Activities',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FeedbackActivities');
  },
};
