let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getServicesForOrgId(req, res, next){


        this.db.query(`SELECT * FROM auto_${req.params.orgid}.services`)
           .then(services=>{
               this.services = services;

               return this.db.query(`SELECT e.*, se.id_service FROM auto_${req.params.orgid}.services_employees AS se LEFT JOIN auto_${req.params.orgid}.employees AS e ON se.id_employee = e.id`)
           })
           .then(employees=>{
               this.employees = employees;

               this.services = this.services.map(service=>{

                   let employees = this.employees.filter(x => x.id_service === service.id);

                   service.employees = employees || [];

                   return service;
               });
               return this.db.query(`SELECT m.*, sm.id_service FROM auto_${req.params.orgid}.services_model AS sm LEFT JOIN auto_${req.params.orgid}.models AS m ON sm.id_model = m.id`);
           })
            .then(models=>{
                this.models = models;

                this.services = this.services.map(service=>{

                    let models = this.models.filter(x => x.id_service === service.id);

                    service.models = models || [];

                    return service;
                });
                res.json(this.services);
            })
            .catch(err => next(err));
    }
    deleteService(req, res, next){
        let {id, orgid} = req.params;

        this.db.query(`DELETE FROM auto_${orgid}.services WHERE id = ?`, [id])
            .then(() => this.db.query(`DELETE FROM auto_${orgid}.services_employees WHERE id_service = ?`, [id]))
            .then(() => this.db.query(`DELETE FROM auto_${orgid}.services_model WHERE id_service = ?`, [id]))
            .then(rows=>{
                res.json(rows);
            })
            .catch(err => {
                next(err)
            });
    }
    changeService(req, res, next){
        let {name, price, duration, id} = req.body;

        this.db.query(`UPDATE auto_${req.params.orgid}.services SET name = ?, price = ?, duration = ? WHERE id = ?`, [name, price, duration, id])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
    addService(req, res, next){
        let {name, price, duration} = req.body;

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