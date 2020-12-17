'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HotelCustomer.init({
    CustomerId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    ReservationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HotelCustomer',
  });
  return HotelCustomer;
};