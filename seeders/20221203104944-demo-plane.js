"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Planes",
      [
        {
          namePlane: "ABX Air",
        },
        {
          namePlane: "Aer Lingus",
        },
        {
          namePlane: "Air Adriatic",
        },
        {
          namePlane: "Air Anatolia",
        },
        {
          namePlane: "Air Atlanta Icelandic",
        },
        {
          namePlane: "Air Finland",
        },
        {
          namePlane: "Air France",
        },
        {
          namePlane: "AIr Inuit",
        },
        {
          namePlane: "Air Japan",
        },
        {
          namePlane: "Air Srpska",
        },
        {
          namePlane: "Air Tindi",
        },
        {
          namePlane: "Air Transat",
        },
        {
          namePlane: "Alliance Airlines",
        },
        {
          namePlane: "ATA",
        },
        {
          namePlane: "AOM French Airlines",
        },
        {
          namePlane: "Arrow Air",
        },
        {
          namePlane: "Aviogenex",
        },
        {
          namePlane: "Belavia",
        },
        {
          namePlane: "BEXAIR",
        },
        {
          namePlane: "Brigenair",
        },
        {
          namePlane: "British Airways",
        },
        {
          namePlane: "British Caledonian",
        },
        {
          namePlane: "Britannia Airways",
        },
        {
          namePlane: "Capitol Air",
        },
        {
          namePlane: "Carnival Air Lines",
        },
        {
          namePlane: "Cargolux",
        },
        {
          namePlane: "Champion Air",
        },
        {
          namePlane: "Citybird",
        },
        {
          namePlane: "EuroAtlantic Airways",
        },
        {
          namePlane: "Finnair",
        },
        {
          namePlane: "First Choice Airways",
        },
        {
          namePlane: "Frontier Flying Service",
        },
        {
          namePlane: "Futura",
        },
        {
          namePlane: "Garuda Indonesia",
        },
        {
          namePlane: "Germania",
        },
        {
          namePlane: "Hapag-Lloyd",
        },
        {
          namePlane: "Helios Airways",
        },
        {
          namePlane: "Japan Airlines",
        },
        {
          namePlane: "JMC",
        },
        {
          namePlane: "Kelowna Flightcraft",
        },
        {
          namePlane: "Kenn Borek Air",
        },
        {
          namePlane: "Ladeco",
        },
        {
          namePlane: "Lion Air",
        },
        {
          namePlane: "Lot Polish Airlines",
        },
        {
          namePlane: "Luzair",
        },
        {
          namePlane: "Martinair",
        },
        {
          namePlane: "Miami Air",
        },
        {
          namePlane: "Monarch Airlines",
        },
        {
          namePlane: "MyTravel Airways",
        },
        {
          namePlane: "Omni Air International",
        },
        {
          namePlane: "Ozjet",
        },
        {
          namePlane: "North American Airlines",
        },
        {
          namePlane: "Palmair",
        },
        {
          namePlane: "Skyservice",
        },
        {
          namePlane: "Starair",
        },
        {
          namePlane: "Sterling European Airlines",
        },
        {
          namePlane: "Sobelair",
        },
        {
          namePlane: "Tame",
        },
        {
          namePlane: "Tango&nbsp;(divisi&nbsp;Air Canada)",
        },
        {
          namePlane: "TransMeridian Airlines",
        },
        {
          namePlane: "UPS",
        },
        {
          namePlane: "White",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Plane", null, {});
  },
};
