// var date1 = new Date("12/31/2019");
// var date2 = new Date("01/01/2020");

// // To calculate the time difference of two dates 
// var Difference_In_Time = date2.getTime() - date1.getTime();

// // To calculate the no. of days between two dates 
// var day_dif = Difference_In_Time / (1000 * 3600 * 24);

// //To display the final no. of days (result) 

// console.log(day_dif);

const {Hotel} = require('./models')

Hotel.getAllHotels()
.then( data => console.log(data))
.catch(err => console.log(err))