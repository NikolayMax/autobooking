var express = require('express');
var router = express.Router();
var db = require('../../db.js');
const EmployeesController = require('./controller');

module.exports = ()=>{

    let controller = new EmployeesController(db);

    router.get('/:orgid', controller.isOrgid, controller.getEmployees.bind(controller));
    router.post('/:orgid', controller.isOrgid, controller.addEmployee.bind(controller));

    return router;
};
