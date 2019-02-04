var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const VisitController = require('./controller');

module.exports = (()=>{

    let controller = new VisitController(db);

    router.post('/:orgid', controller.isOrgid.bind(controller), controller.create.bind(controller));


    return router;
})();
