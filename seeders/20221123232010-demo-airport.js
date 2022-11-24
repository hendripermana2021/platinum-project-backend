"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Airports",
      [
        {
          name_airport: "Soekarno-Hatta International Airport",
          code_airport: "SHT",
          address: "Jakarta International Soekarno-Hatta Airport Building",
          city_airport: "Jakarta",
          country_airport: "JKT",
          terminal: "A-001",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_airport: "Kualanamu International Airport",
          code_airport: "SHT",
          address: "Deli Serdang, Batang Kuis",
          city_airport: "Medan",
          country_airport: "MDN",
          terminal: "A-002",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name_airport: "Gusti Ngurah Rai Airport",
          code_airport: "GNR",
          address: "South Bali",
          city_airport: "Bali",
          country_airport: "BLI",
          terminal: "A-003",
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airports", null, {});
  },
};
