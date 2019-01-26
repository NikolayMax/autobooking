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
}
module.exports = ServiceEmployeesController;