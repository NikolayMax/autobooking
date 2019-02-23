const BaseController = require('../BaseController');

class EmployeesController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    deleteEmployee(req, res, next){
        this.db.query(`DELETE FROM auto_${req.params.orgid}.employees WHERE id = ?`, [req.params.id])
            .then(()=>{
                res.json();
            })
            .catch((err)=>{
                   next(err);
            });
    }
    addEmployee(req, res, next){
        let {firstname, lastname, patronymic, phone, email, position} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}.employees (lastname, firstname, patronymic, email, phone, position_id) VALUES(?, ?, ?, ?, ?, ?)`, [lastname, firstname, patronymic, email, phone, position])
            .then(results => {
                console.log(results);
                res.json(results)
            })
            .catch(err => {
                console.log(err);
                next(err)
            });
    }
    changeEmployee(req, res, next){
        let {firstname, lastname, patronymic, phone, email, position, id} = req.body;

        this.db.query(`UPDATE auto_${req.params.orgid}.employees SET lastname = ?, firstname = ?, patronymic = ?, email = ?, phone = ?, position_id = ? WHERE id = ?`,
            [lastname, firstname, patronymic, email, phone, position, id])
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

        this.db.query(sql, params)
            .then(results => res.json(results))
            .catch(err => next(err));
    }

}
module.exports = EmployeesController;