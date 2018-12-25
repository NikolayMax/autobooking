var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const UserController = require('./controller');

module.exports = ()=>{

    let controller = new UserController(db);

    router.post('/login', controller.login.bind(controller));

    return router;
};
