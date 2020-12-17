function convertDate(data){
    let monthArr = ['January', 'February', 'March', 'April','May','June', 'July','August','September','October','November','December']
    let date = new Date(data).getDate() 
    let month = new Date(data).getMonth()
    let year = new Date(data).getFullYear() 
    return `${date}-${monthArr[month]}-${year}`
}

module.exports = convertDate;