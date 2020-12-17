'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reservation.belongsTo(models.Customer)
      Reservation.belongsTo(models.Hotel)
    }
  };
  Reservation.init({
    CustomerId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    nameHotel: DataTypes.STRING,
    city: DataTypes.STRING,
    checkIn: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Check in harus di isi"
        },
        isTomorow(value){
          let result = new Date(value).getTime() - new Date().getTime()
          if (result < 1){
            throw new Error('Tidak bisa check in pada hari ini')
          }
        }
      }
    },
    checkOut: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: "Check Out harus di isi"
        },
        moreThanCheckIn(value){
          // console.log(this.checkIn);
          let result = new Date(value).getTime() - new Date(this.checkIn).getTime()
          if (result < 1){
            throw new Error('Tidak bisa check out pada hari yang sama')
          }
        }
      }
    },
    totalRoom: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Kamar harus di isi"
        },
        greaterThanZero(value){
          if (value < 1){
            throw new Error('Kamar harus lebih dari 0')
          }
        }
      }
    },
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};


