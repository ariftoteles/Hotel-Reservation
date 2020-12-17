const {Customer,Hotel, Review} = require('../models/index')

class HotelController {
    static getHotels(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        let sort = ['city', 'ASC']
        Hotel.findAll({
            include: [Review],
            order: [sort],
            limit:10
        })
        .then(data => {
            sort = sort.join(',')
            // res.send(data)
            res.render('hotel', {data, sort, name})
        }) 
        .catch(err => res.send(err))
    }

    static getHotelsCity(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        if (!req.body.city){
            let message = 'You should filled city'
            res.redirect('/hotels')
        } else {
            let sort = ['city', 'ASC']
            if (req.body.sort){
                sort = req.body.sort.split(',')
            }
            let city = req.body.city
            Hotel.findAll({
                include: [Review],
                where:{city},
                order: [sort]
            })
            .then(data => {
                sort = sort.join(',')
                res.render('hotel', {data,sort, name})
            }) 
            .catch(err => res.send(err))
        }
    }

    static getHotelsReview(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username
        }
        let id = +req.params.id
        Hotel.findOne({
            include: [Customer,Review],
            where:{id}
        })
        .then(data => {
            // res.send(data)
            res.render('review', {data, name})
        })
        .catch(err => res.send(err))
    }

}

module.exports = HotelController;