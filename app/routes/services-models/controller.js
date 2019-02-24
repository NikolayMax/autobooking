let BaseController = require('../BaseController');

class ServiceModelsController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    change(req, res, next){
        let {serviceId, models} = req.body;

        this.db.query(`DELETE FROM auto_${req.params.orgid}.services_model WHERE id_service = ?`, [serviceId])
            .then(()=>this.db.query(`SELECT * FROM auto_${req.params.orgid}.models WHERE id IN (?)`, [models]))
            .then(rows=>{
                let data=rows.map(model=>[serviceId, model.id]);
                this.db.query(`INSERT INTO auto_${req.params.orgid}.services_model (id_service, id_model) VALUES ?`, [data])
            })
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
    save(req, res, next){
        let {serviceId, models} = req.body;

        this.db.query(`SELECT * FROM auto_${req.params.orgid}.models WHERE id IN (?)`, [models])
            .then(rows=>{
                let data=rows.map(model=>[serviceId, model.id]);
                this.db.query(`INSERT INTO auto_${req.params.orgid}.services_model (id_service, id_model) VALUES ?`, [data])
            })
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
}
module.exports = ServiceModelsController;