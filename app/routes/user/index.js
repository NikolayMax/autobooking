var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const UserController = require('./controller');
const passport = require('passport');

module.exports = (()=>{

    let controller = new UserController(db);

    router.post('/login', passport.authenticate('local'), controller.login.bind(controller));
    router.post('/register', controller.register.bind(controller));
    router.get('/logout', controller.logout.bind(controller));

    router.get('/isAuth', controller.isAuth.bind(controller));

    router.get('/', function (req, res, next){
        if(req.isAuthenticated())
            next();
        else
            res.redirect('/login');
    }, controller.list.bind(controller));

    return router;
})();
