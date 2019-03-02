var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const ServiceController = require('./controller');

module.exports = ()=>{

    let controller = new ServiceController(db);

    router.get('/:orgid', controller.isOrgid.bind(controller), controller.getServices.bind(controller));
    router.post('/:orgid', controller.isOrgid.bind(controller), controller.addService.bind(controller));
    router.put('/:orgid', controller.isOrgid.bind(controller), controller.changeService.bind(controller));
    router.delete('/:orgid/:id', controller.isOrgid.bind(controller), controller.deleteService.bind(controller));

    return router;
};
