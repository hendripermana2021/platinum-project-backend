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
      // define association here
    }
  }
  Ticket.init(
    {
      id_airport: DataTypes.STRING,
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
      oneway: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
