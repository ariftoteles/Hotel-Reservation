'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = fs.readFileSync('./hotel_pegi.csv', 'utf-8').split('\n')
    let result = []
    data.forEach(el => {
      let [name, city, price, rating, image, ...description] = el.split(',')
      if (!isNaN(+price) && !isNaN(+rating)){
        let obj = {
          name,
          city,
          price: price * 1000,
          rating: 0,
          image,
          description : description.join(', '),
          createdAt: new Date(),
          updatedAt: new Date()
        }
        result.push(obj)
      }

    })

    return queryInterface.bulkInsert('Hotels', result, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Hotels', null, {})
  }
};