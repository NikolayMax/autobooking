var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const VisitController = require('./controller');

module.exports = (()=>{

    let controller = new VisitController(db);

    router.post('/:orgid', controller.isOrgid.bind(controller), controller.create.bind(controller));
    router.get('/:orgid', controller.isOrgid.bind(controller), controller.list.bind(controller));
    router.get('/items/:orgid', controller.isOrgid.bind(controller), controller.visitItems.bind(controller));
    router.get('/client/:orgid', controller.isOrgid.bind(controller), controller.client.bind(controller));


    return router;
})();
