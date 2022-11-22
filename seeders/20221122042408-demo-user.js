"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          firstname: "admin",
          lastname: "saja",
          nohp: "08981234345",
          birthday: new Date(),
          country: "Delitua",
          province: "Sumatera Utara",
          city: "Medan",
          address: "Jln. Delitua Pamah Gg. tumiran",
          postalcode: 12341,
          pictures: "bit.lyasda",
          role: "admin",
          password: await bcrypt.hash("123456", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "buyer@gmail.com",
          firstname: "buyer",
          lastname: "buyersaja",
          nohp: "08981234345",
          birthday: new Date(),
          country: "Delitua",
          province: "Sumatera Utara",
          city: "Medan",
          address: "Jln. Buyer",
          postalcode: "12345",
          pictures: "bit.lyasda",
          role: "buyer",
          password: await bcrypt.hash("123456", 10),
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
