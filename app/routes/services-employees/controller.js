let BaseController = require('../BaseController');

class ServiceEmployeesController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    save(req, res, next){
        let {serviceId, employees} = req.body,
        data=employees.map(employee=>[serviceId, employee]);

        this.db.query(`INSERT INTO auto_${req.params.orgid}.services_employees (id_service, id_employee) VALUES ?`, [data])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
    change(req, res, next){
        let {serviceId, employees} = req.body,
            data=employees.map(employee=>[serviceId, employee]);

        this.db.query(`DELETE FROM auto_${req.params.orgid}.services_employees WHERE id_service = ?`, [serviceId])
            .then(()=>{
                if(data.length)
                    return this.db.query(`INSERT INTO auto_${req.params.orgid}.services_employees (id_service, id_employee) VALUES ?`, [data]);
                else
                    return Promise.resolve()
            })
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                console.log(err);
                next(err)
            });
    }
}
module.exports = ServiceEmployeesController;