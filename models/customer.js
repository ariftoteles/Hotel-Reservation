'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/hashPassword')
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Hotel, {
        through: models.HotelCustomer,
        foreignKey: "CustomerId"
      })
      Customer.hasMany(models.Reservation)
      Customer.hasMany(models.Review)
    }
  };
  Customer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};