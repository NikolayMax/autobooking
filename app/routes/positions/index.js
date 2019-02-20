var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const PositionController = require('./controller');

module.exports = (()=>{

    let controller = new PositionController(db);

    router.get('/:orgid', controller.isOrgid.bind(controller), controller.getPositions.bind(controller));
    router.put('/:orgid', controller.isOrgid.bind(controller), controller.changePosition.bind(controller));
    router.post('/:orgid', controller.isOrgid.bind(controller), controller.addPosition.bind(controller));
    router.delete('/:orgid/:id', controller.isOrgid.bind(controller), controller.delete.bind(controller));

    return router;
})();