"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tickets",
      [
        {
          id_airport: "1",
          arrival_id: "2",
          departure_date: "11-15-20",
          departure_time: "12312412",
          arrival_time: "1231241",
          passenger: "Dewasa 2, anak 1,",
          departure_terminal: "Surabaya",
          arrival_terminal: "Soekarno Hatta",
          price: "200000",
          class: "bussines",
          plane_name: "Garuda Indonesia",
          oneway: true,
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
