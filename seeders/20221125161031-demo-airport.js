"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Airports",
      [
        {
          name: "Bandara Raya Soekarno Hatta",
          code: "LION123",
          city: "Jakarta",
          country: "Jakarta",
          terminal: "Soekarno Hatta",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bandara Raya Polonia Raya",
          code: "SRJ-523",
          city: "Medan",
          country: "Medan",
          terminal: "Polonia",
          status: true,
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
