"use strict";
const { Model } = require("sequelize");
const db = "../models/index.js";
const Airport = db.Airport;
const Ticket = db.Ticket;
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    associate = (models) => {
      Booking.hasMany(models.Users, {
        as: "data_users",
        foreignKey: "id",
      });

      Ticket.hasMany(models.Tickets, {
        as: "data_ticket",
        foreignKey: "id",
      });

      Airport.hasMany(models.Airport, {
        as: "data_airport",
        foreignKey: "id",
      });
    };
  }
  Booking.init(
    {
      id_ticket: DataTypes.INTEGER,
      id_users: DataTypes.INTEGER,
      id_airport: DataTypes.INTEGER,
      isBooking: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
