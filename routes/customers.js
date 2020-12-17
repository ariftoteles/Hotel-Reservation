const CustomerController = require('../controllers/CustomerController')
const express = require('express')
const reservation = require('./reservation')
const router = express.Router()

router.get('/register', CustomerController.customerRegister)
router.post('/register', CustomerController.handleRegister)
router.get('/login', CustomerController.customerLogin)
router.post('/login', CustomerController.handleLogin)
router.get('/logout', CustomerController.customerLogout)
router.use('/', reservation)

module.exports = router