'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ticket: {
        type: Sequelize.INTEGER
      },
      id_users: {
        type: Sequelize.INTEGER
      },
      id_airport: {
        type: Sequelize.INTEGER
      },
      isBooking: {
        type: Sequelize.BOOLEAN
      },
      isPayment: {
        type: Sequelize.BOOLEAN
      },
      isPending: {
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
    await queryInterface.dropTable('Bookings');
  }
};