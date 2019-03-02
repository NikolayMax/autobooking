let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getServicesFilter(){

    }
    joinEmployees(services){
        let {orgid} = req.params;

        return this.db.query(`SELECT e.*, se.id_service FROM auto_${orgid}.services_employees AS se LEFT JOIN auto_${orgid}.employees AS e ON se.id_employee = e.id`)
            .then(rows=> Promise.resolve(services.map(service=>{

                service.employees = rows.filter(x => x.id_service === service.id);

                return service;
            })))
    }
    getServices(req, res, next){
        let {orgid, car, model} = req.params;

        this.db.query(`SELECT * FROM auto_${orgid}.services`)
           .then(services=>{
               this.services = services;

               return this.joinEmployees(services)
           })
           .then(employees=>{
               this.employees = employees;

               return this.db.query(`SELECT m.*, sm.id_service FROM auto_${orgid}.services_model AS sm LEFT JOIN auto_${orgid}.models AS m ON sm.id_model = m.id`);
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