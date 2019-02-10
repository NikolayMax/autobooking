let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getServicesForOrgId(req, res, next){


        this.db.query(`SELECT s.*, se.id_employee FROM auto_${req.params.orgid}.services AS s LEFT JOIN auto_${req.params.orgid}.services_employees AS se ON s.id = se.id_service`)
           .then(services=>{
               this.services = services;
               return this.db.query(`SELECT * FROM auto_${req.params.orgid}.employees`)
           })
           .then(employees=>{
               this.employees = employees;
               this.services = this.services.map(service=>{
                   service.employees = [];

                   let employee = this.employees.find(x => x.id === service.id_employee);

                   if(employee)
                       service.employees.push(employee);

                   return service;
               });
               res.json(this.services);
           })
            .catch(err => next(err));
    }
    addService(req, res, next){
        let {name, price, duration} = req.body;
        console.log(name, price, duration);

        this.db.query(`INSERT INTO auto_${req.params.orgid}.services (name, price, duration) VALUES(?, ?, ?)`, [name, price, duration])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
}
module.exports = ServiceController;