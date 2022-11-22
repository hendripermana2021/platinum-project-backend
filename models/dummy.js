'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dummy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Users, { foreignKey: 'firstname', })
    }
  }
  Dummy.init({
    firstname: DataTypes.STRING,
    dummy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dummy',
  });
  return Dummy;
};