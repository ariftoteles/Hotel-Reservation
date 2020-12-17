const {Customer, Hotel, Reservation} = require('../models')
const unhashPassword = require('../helpers/unhashPassword')

class CustomerController{
    static customerRegister(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        res.render('./customer/register', {name})
    }

    static handleRegister(req, res){
        let value = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        Customer.create(value)
        .then(() => res.redirect('/customers/login'))
        .catch(err => res.send(err))
    }

    static customerLogin(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        res.render('./customer/login', {name})
    }

    static handleLogin(req, res){
        let username = req.body.username
        let password = req.body.password
        Customer.findOne({
                where: {
                    username: username
                }
            })
            .then(data => {
                if (data && unhashPassword(password, data.password)) {
                    req.session.userId = data.id
                    req.session.username = data.username
                    res.redirect('/hotels')
                } else {
                    res.send('Wrong username or password')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static customerLogout(req, res) {
        req.session.destroy(() => {
            res.redirect('/hotels')
        })
    }

}

module.exports = CustomerController;