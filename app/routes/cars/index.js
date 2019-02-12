var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const CarsController = require('./controller');

module.exports = (()=>{

    let controller = new CarsController(db);

    router.get('/:orgid', controller.isOrgid.bind(controller), controller.getCars.bind(controller));
    router.post('/:orgid', controller.isOrgid.bind(controller), controller.saveCar.bind(controller));
    router.delete('/:orgid/:id', controller.isOrgid.bind(controller), controller.delete.bind(controller));

    return router;
})();
