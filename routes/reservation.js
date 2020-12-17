const ReservationController = require('../controllers/ReservationController')
const express = require('express')
const router = express.Router()

router.get('/reservation', ReservationController.getReservationList)
router.get('/reservation/edit/:id', ReservationController.editReservation)
router.post('/reservation/edit/:id/:price', ReservationController.handleEditReservation)
router.get('/reservation/delete/:id', ReservationController.deleteReservation)

module.exports = router