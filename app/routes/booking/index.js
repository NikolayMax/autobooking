var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const BookingController = require('./controller');

module.exports = (()=>{

    let controller = new BookingController(db);

    router.get('/timeIntervals/:orgid/:date', controller.isOrgid.bind(controller), controller.timeIntervals.bind(controller));


    return router;
})();
