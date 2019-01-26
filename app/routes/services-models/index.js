var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const ServiceEmployeesController = require('./controller');

module.exports = (()=>{

    let controller = new ServiceEmployeesController(db);

    router.post('/:orgid', controller.isOrgid.bind(controller), controller.save.bind(controller));


    return router;
})();
