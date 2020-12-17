const {Reservation, Hotel, Customer, Review, HotelCustomer} = require('../models/index')
const convertDate = require('../helpers/convertDate')
const dateToString = require('../helpers/dateToString')

class ReservationController{
    static handleReservation(req, res){
        let value = {
            CustomerId: +req.session.userId,
            HotelId: +req.params.id,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalRoom: +req.body.totalRoom,
        }
        let customerId = +req.session.userId
        let hotelId = +req.params.id
        Hotel.findByPk(hotelId)
        .then(data => {
            value.amount = Reservation.getAmount(value.checkOut, value.checkIn, value.totalRoom, data.price)
            value.nameHotel = data.name
            value.city = data.city
            return Reservation.create(value)
        })
        .then((data)=> {
            return HotelCustomer.create({
                CustomerId: customerId,
                HotelId: hotelId,
                ReservationId: data.id
            })
        })
        .then((data) => {
            res.redirect(`/nodemailer/${data.ReservationId}`)
        })
        .catch(err => {
            let errMsg = []
            err.errors.forEach( el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
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
            res.render('reservation-list', {data, name, convertDate})
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
            res.render('form-edit-reservation', {data, name, dateToString})
        })
        .catch(err => res.send(err))
    }

    static handleEditReservation(req, res){
        let value = {
            CustomerId: +req.session.userId,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            totalRoom: req.body.totalRoom,
        }
        let id = +req.params.id
        
        Reservation.findByPk(id, {
            include: [Hotel]
        })
        .then(data => {
            value.HotelId = data.HotelId
            value.nameHotel = data.nameHotel
            value.city = data.city
            value.amount = Reservation.getAmount(value.checkOut, value.checkIn, value.totalRoom, data.Hotel.price)
            return Reservation.update(value, {where: {id}})
        })
        .then(() => res.redirect('/customers/reservation'))
        .catch(err => {
            let errMsg = []
            err.errors.forEach( el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
    }
    
    static deleteReservation(req, res){
        let id = +req.params.id
        Reservation.destroy({
            where:{id}
        })
        .then(() => {
            res.redirect('/customers/reservation')
        })
        .catch(err => res.send(err))
    }

}

module.exports = ReservationController;