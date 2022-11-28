"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Passangers",
      [
        {
          name: "Budi-Passenger1",
          email: "budi@gmail.com",
          age: 20,
          identityType: "Identity Type Budi",
          identityNumber: "Identity Number Budi",
          booking_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Passangers", null, {});
  },
};
