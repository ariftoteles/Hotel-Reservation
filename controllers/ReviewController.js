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
        let value2 = {}
        let totalReview
        let totalRating
        let newRating
        Hotel.findOne({
            where: {
                id: value.HotelId
            },
            include: [Review]
        })
        .then(data => {
            totalReview = data.Reviews.length
            totalRating = data.rating * totalReview
            newRating = (totalRating+value.rating) / (totalReview+1)
            value2.name = data.name
            value2.city = data.city
            value2.price = data.price
            value2.rating = newRating
            value2.image = data.image
            value2.description = data.description

            return Review.create(value)
        })
        .then(() => {
            return Hotel.update(value2, {
                where: {
                    id: value.HotelId
                }
            })
        })
        .then(() => [
            res.redirect(`/hotels/${value.HotelId}`)
        ])
        .catch( err => res.send(err))
    }
}

module.exports = ReviewController;