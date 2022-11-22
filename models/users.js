'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthday: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nohp: DataTypes.STRING,
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    postalcode: DataTypes.INTEGER,
    pictures: DataTypes.STRING,
    role: DataTypes.STRING,
    access_token: DataTypes.TEXT,
    refresh_token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};