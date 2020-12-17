const {Customer,Hotel, Review, HotelCustomer} = require('../models/index')

class ReviewController{
    static handleReview(req, res){
        let value = {
            CustomerId: +req.session.userId,
            HotelId: +req.params.id,
            username: req.session.username,
            rating: +req.body.rating,
            comment: req.body.comment
        }
        let value2 = {
            CustomerId: +req.session.userId,
            HotelId: +req.params.id,
        }
        Review.create(value)
        .then(()=> {
            return HotelCustomer.create(value2)
        })
        .then(()=> {
            res.redirect(`/hotels/${value.HotelId}`)
        }) 
        .catch(err => res.send(err))
    }
}

module.exports = ReviewController;