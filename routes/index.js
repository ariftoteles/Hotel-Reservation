const IndexController = require('../controllers/IndexController')
const express = require('express')
const hotels = require('./hotels')
const customers = require('./customers')
const router = express.Router()

router.get('/', IndexController.getHome)
router.use('/hotels', hotels)
router.use('/customers', customers)

module.exports = router;