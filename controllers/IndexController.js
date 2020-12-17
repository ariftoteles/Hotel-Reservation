const {
    Customer,
    Hotel,
    Reservation
} = require('../models')
const nodemailer = require('nodemailer');
const convertDate = require('../helpers/convertDate')

class IndexController {
    static getHome(req, res) {
        let name
        if (req.session.userId) {
            name = req.session.username
        }
        res.render('home', {
            name
        })
    }

    static sendEmail(req, res) {
        const reservationId = req.params.reservation_id
        Reservation.findByPk(reservationId, {
                include: [Hotel, Customer]
            })
            .then(data => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'travellaku1@gmail.com',
                        pass: 'lakutravel123'
                    }
                })

                const mailOptions = {
                    from: 'travellaku1@gmail.com',
                    to: data.Customer.email,
                    subject: 'Reservation Hotel',
                    html: `<h1>Hi. ${data.Customer.name}</h1>
                    <h3>Berikut detail pesanan hotel anda<h3>
                    <p>Hotel :  ${data.nameHotel}</p>
                    <p>Kota :  ${data.city}</p>
                    <p>CheckIn :  ${convertDate(data.checkIn)}</p>
                    <p>CheckOut :  ${convertDate(data.checkOut)}</p>
                    <p>Jumlah Kamar :  ${data.totalRoom}</p>
                    <p>Harga :  ${data.formatRupiah()}</p>
                     `
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    res.redirect('/customers/reservation')
                })
            })
            .catch(err => res.send(err))
    }
}

module.exports = IndexController;