function getAmount(checkOut, checkIn, room, price){
    let difTime = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    let day_dif = difTime / (1000 * 3600 * 24);
    let amount = day_dif * room * price
    return amount
}

module.exports = getAmount