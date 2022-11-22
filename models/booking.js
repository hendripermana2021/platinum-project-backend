"use strict";
const { Model } = require("sequelize");
// const { FOREIGNKEYS } = require("sequelize/types/query-types");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      id_ticket: DataTypes.INTEGER,
      id_users: DataTypes.INTEGER,
      id_airport: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  // Booking.hasOne(Users, {foreignKey:'id_ticket'})
  // Booking.belongsTo (Users, {foreignKey:'id_ticket'})

  // Booking.removeAttribute('id')

  return Booking;
};
