"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tickets",
      [
        {
          flight_id: 1,
          class_id: 1,
          price: 20000,
          country: "Indonesia",
          passanger_ammount: "Dewasa 2, Anak-anak 1, bayi 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tickets", null, {});
  },
};
