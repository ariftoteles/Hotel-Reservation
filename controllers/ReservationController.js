const {Reservation, Hotel, Customer, Review} = require('../models/index')
const getAmount = require('../helpers/getAmount')
const convertDate = require('../helpers/convertDate')
const formatRupiah = require('../helpers/formatRupiah')
const dateToString = require('../helpers/dateToString')

class ReservationController{
    static handleReservation(req, res){
        let value = {
            CustomerId: +req.session.userId,
            HotelId: +req.params.id,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalRoom: req.body.totalRoom
        }
        Hotel.findByPk(value.HotelId)
        .then(data => {
            value.amount = getAmount(value.checkOut, value.checkIn, value.totalRoom, data.price)
            return Reservation.create(value)
        })
        .then(()=> res.redirect('/customers/reservation'))
        .catch(err => res.send(err))
    }


    static getReservationList(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        let id = req.session.userId;
        Reservation.findAll({
            where: {
                CustomerId: id
            },
            include: [Hotel, Customer],
            order: [['checkIn', 'ASC']]
        })
        .then(data => {
            // res.send(data)
            res.render('booking-list', {data, name, convertDate, formatRupiah})
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editReservation(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        let id = req.params.id
        Reservation.findByPk(id,{
            include: [Hotel, Customer]
        })
        .then(data => {
            res.render('form-edit-booking', {data, name, dateToString})
        })
        .catch(err => res.send(err))
    }

    static handleEditReservation(req, res){
        let value = {
            CustomerId: +req.session.userId,
            HotelId: +req.params.id,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalRoom: req.body.totalRoom,
        }
        let id = +req.params.id
        value.amount = getAmount(value.checkOut, value.checkIn, value.totalRoom, req.params.price)
        Reservation.update(value, {
            where: {
                id: id
            }
        })
        .then(() => res.redirect('/customers/reservation'))
        .catch(err => res.send(err))
    }
    
    static deleteReservation(req, res){
        let id = +req.params.id
        Reservation.destroy({
            where:{id}
        })
        .then(() => res.redirect('/customers/reservation'))
        .catch(err => res.send(err))
    }

}

module.exports = ReservationController;