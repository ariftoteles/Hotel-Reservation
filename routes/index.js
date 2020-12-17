const IndexController = require('../controllers/IndexController')
const express = require('express')
const hotels = require('./hotels')
const customers = require('./customers')
const nodeMailer = require('./nodemailerRoutes')
const router = express.Router()

router.get('/', IndexController.getHome)
router.use('/nodemailer', nodeMailer)
router.use('/hotels', hotels)
router.use('/customers', customers)

module.exports = router;