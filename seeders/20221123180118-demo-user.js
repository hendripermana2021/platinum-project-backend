"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstname: "admin",
          lastname: "saja",
          gender: "Laki-laki",
          birthdate: "30-09-1999",
          email: "admin@gmail.com",
          password: await bcrypt.hash("123456", 10),
          nohp: "0896789203",
          country: "Indonesia",
          province: "Sumatera Utara",
          city: "Medan",
          address: "Delitua",
          postalcode: "20355",
          pictures: "",
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstname: "buyer",
          lastname: "saja",
          gender: "perempuan",
          birthdate: "30-09-1998",
          email: "buyer@gmail.com",
          password: await bcrypt.hash("123456", 10),
          nohp: "0896789203",
          country: "Indonesia",
          province: "Sumatera Utara",
          city: "Medan",
          address: "Delitua",
          postalcode: "20355",
          pictures: "",
          role: "buyer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      { email: { [Op.in]: emails } },
      {}
    );
  },
};
