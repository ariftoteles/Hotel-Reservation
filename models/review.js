'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Hotel)
      Review.belongsTo(models.Customer)
    }
  };
  Review.init({
    CustomerId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "Rating harus diisi"
        }
      }
    },
    comment: {
      type:  DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: "Komentar harus di isi"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};