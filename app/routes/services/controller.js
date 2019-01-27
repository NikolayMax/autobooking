let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getServicesForOrgId(req, res, next){
        let sql = `SELECT * FROM auto_${req.params.orgid}.services`,
            params;

        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }
        if(req.query && req.query.model){
            sql = `SELECT s.* FROM auto_${req.params.orgid}.services AS s, auto_${req.params.orgid}.services_model AS sm WHERE s.id = sm.id_service AND sm.id_mark = ? ORDER BY s.id ASC`;
            params = [req.query.model];
        }

       this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{
                if(results.length)
                    return this.db.query(sql, params);
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.status(200).send(results))
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