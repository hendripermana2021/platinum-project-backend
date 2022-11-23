'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History - Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History - Payment.init({
    id_ticket: DataTypes.INTEGER,
    id_users: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History-Payment',
  });
  return History - Payment;
};