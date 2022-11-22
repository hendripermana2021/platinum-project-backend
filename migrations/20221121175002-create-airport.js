'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airports', {
      id_airport: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_airport: {
        type: Sequelize.STRING
      },
      code_airport: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      city_airport: {
        type: Sequelize.STRING
      },
      country_airport: {
        type: Sequelize.STRING
      },
      terminal: {
        type: Sequelize.STRING
      },
      status: {
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
    await queryInterface.dropTable('Airports');
  }
};