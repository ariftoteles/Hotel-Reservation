'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.belongsToMany(models.Customer, {
        through: models.HotelCustomer,
        foreignKey: "HotelId"
      })
      Hotel.hasMany(models.Review)
      Hotel.hasMany(models.Reservation)
    }
  };
  Hotel.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    price: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};