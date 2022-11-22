"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Airports",
      [
        {
          name_airport: "Soekarno Hatta",
          code_airport: "CDA",
          address: "Tengku Wibowo",
          price: "20000",
          city_airport: "jakarta",
          country_airport: "Jln Sucipto",
          terminal: "F45",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
