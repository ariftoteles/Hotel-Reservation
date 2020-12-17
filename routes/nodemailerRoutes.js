const {Customer, Hotel, Reservation} = require('../models')
const express = require('express');
const IndexController = require('../controllers/IndexController');
const router = express.Router()

router.get('/:reservation_id', IndexController.sendEmail)

module.exports = router