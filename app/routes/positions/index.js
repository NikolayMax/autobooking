var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const PositionController = require('./controller');

module.exports = (()=>{

    let controller = new PositionController(db);

    router.get('/:orgid', controller.isOrgid.bind(controller), controller.getPositions.bind(controller));
    router.post('/:orgid', controller.isOrgid.bind(controller), controller.addPosition.bind(controller));

    return router;
})();