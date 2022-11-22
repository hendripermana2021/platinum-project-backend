'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_airport: {
        type: Sequelize.STRING
      },
      arrival_id: {
        type: Sequelize.INTEGER
      },
      departure_date: {
        type: Sequelize.DATE
      },
      departure_time: {
        type: Sequelize.TIME
      },
      arrival_time: {
        type: Sequelize.TIME
      },
      passenger: {
        type: Sequelize.STRING
      },
      departure_terminal: {
        type: Sequelize.STRING
      },
      arrival_terminal: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      class: {
        type: Sequelize.STRING
      },
      plane_name: {
        type: Sequelize.STRING
      },
      oneway: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};