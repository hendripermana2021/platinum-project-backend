"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "FlightTypes",
      [
        {
          type: "Economy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Business",
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
