let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getServicesForOrgId(req, res, next){
        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }
       this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{
                if(results.length)
                    return this.db.query(`SELECT s.*, se.id_employee FROM auto_${req.params.orgid}.services AS s LEFT JOIN auto_${req.params.orgid}.services_employees AS se ON s.id = se.id_service`);
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
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