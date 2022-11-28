"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Wishlists",
      [
        {
          user_id: 1,
          ticket_id: 1,
          isWishlist: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          ticket_id: 2,
          isWishlist: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Wishlists", null, {});
  },
};
