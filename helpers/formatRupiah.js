function formatRupiah(value){
   return `Rp. ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}` 
}

module.exports = formatRupiah