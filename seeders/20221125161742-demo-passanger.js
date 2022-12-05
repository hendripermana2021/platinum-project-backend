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
        {
          name: "Eko-Passanger2",
          email: "Eko@gmail.com",
          age: 30,
          identityType: "Identity Type Eko",
          identityNumber: "Identity Number Eko",
          booking_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ismail-Passenger1",
          email: "ismail@gmail.com",
          age: 20,
          identityType: "Identity Type ismail",
          identityNumber: "Identity Number ismail",
          booking_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "abraham-Passanger2",
          email: "abraham@gmail.com",
          age: 30,
          identityType: "Identity Type abraham",
          identityNumber: "Identity Number Abraham",
          booking_id: 2,
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
