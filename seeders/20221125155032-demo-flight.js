"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Flights",
      [
        {
          departureAirport: 1,
          arrivalAirport: 1,
          departureDate: "30-09-2022",
          arrivalDate: "01-10-2022",
          departureTime: "23:05:59",
          arrivalTime: "07:09:20",
          flightType: 1,
          planeName: "SRIWIJAYA AIR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Flights", null, {});
  },
};
