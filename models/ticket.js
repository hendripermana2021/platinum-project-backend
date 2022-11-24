"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Ticket.belongsTo(models.Booking, {
      //   as: "data_ticket",
      //   foreignKey: "id",
      // });
    }
  }
  Ticket.init(
    {
      id_airport: DataTypes.STRING,
      id_plane: DataTypes.INTEGER,
      arrival_id: DataTypes.INTEGER,
      departure_date: DataTypes.DATE,
      departure_time: DataTypes.TIME,
      arrival_time: DataTypes.TIME,
      passenger: DataTypes.STRING,
      departure_terminal: DataTypes.STRING,
      arrival_terminal: DataTypes.STRING,
      price: DataTypes.FLOAT,
      type_class: DataTypes.STRING,
      plane_name: DataTypes.STRING,
      isOneway: DataTypes.BOOLEAN,
      isTwoway: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
