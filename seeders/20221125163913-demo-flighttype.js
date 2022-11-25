"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "FlightTypes",
      [
        {
          type: "Flight Type 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Flight Type 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("FlightTypes", null, {});
  },
};
