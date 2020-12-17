const HotelController = require('../controllers/HotelController')
const ReviewController = require('../controllers/ReviewController')
const ReservationController = require('../controllers/ReservationController')
const express = require('express')
const authLogin = require('../middleware/authLogin')
const router = express.Router()

router.get('/', HotelController.getHotels)
router.post('/',  HotelController.getHotelsCity)
router.get('/:id',  HotelController.getHotelsReview)
router.post('/:id/review', authLogin, ReviewController.handleReview)
router.post('/:id/reservation', authLogin, ReservationController.handleReservation)

module.exports = router;