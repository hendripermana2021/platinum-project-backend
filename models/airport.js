"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Airport.belongsTo(models.Booking, {
        as: "data_airport",
        foreignKey: "id_airport",
      });
    }
  }
  Airport.init(
    {
      name_airport: DataTypes.STRING,
      code_airport: DataTypes.STRING,
      address: DataTypes.STRING,
      city_airport: DataTypes.STRING,
      country_airport: DataTypes.STRING,
      terminal: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
