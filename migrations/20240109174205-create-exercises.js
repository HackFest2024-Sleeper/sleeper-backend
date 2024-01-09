'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      duration: {
        type: Sequelize.STRING,
      },
      repetitions: {
        type: Sequelize.INTEGER,
      },
      sets: {
        type: Sequelize.INTEGER,
      },
      video: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('exercises');
  }
};