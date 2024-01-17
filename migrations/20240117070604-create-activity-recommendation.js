'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ActivityRecommendations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      activities: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('ActivityRecommendations');
  },
};
