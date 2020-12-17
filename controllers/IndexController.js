class IndexController {
    static getHome(req, res){
        let name
        if (req.session.userId) {
            name = req.session.username    
        }
        res.render('home', {name})
    }
}

module.exports = IndexController;