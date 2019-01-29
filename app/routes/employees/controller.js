const BaseController = require('../BaseController');

class EmployeesController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    addEmployee(req, res, next){
        let {firstname, lastname, patronymic, phone, password, email} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}.employees (lastname, firstname, patronymic, email, password, phone) VALUES(?, ?, ?, ?, ?, ?)`, [lastname, firstname, patronymic, email, password, phone])
            .then(results => {
                console.log(results);
                res.json(results)
            })
            .catch(err => {
                console.log(err);
                next(err)
            });
    }
    getEmployees(req, res, next){
        let sql = `SELECT * FROM auto_${req.params.orgid}.employees`,
            params;
        if(req.query && req.query.serviceIds){
            sql = `SELECT e.* FROM auto_${req.params.orgid}.employees AS e, auto_${req.params.orgid}.services_employees AS se WHERE e.id = se.id_employee AND se.id_service in (?)`;
            params = [req.query.serviceIds];
        }

       this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{

                if(results.length)
                    return this.db.query(sql, params);
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.json(results))
            .catch(err => next(err));
    }

}
module.exports = EmployeesController;