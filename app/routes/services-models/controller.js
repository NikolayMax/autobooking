let BaseController = require('../BaseController');

class ServiceModelsController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    save(req, res, next){
        let {serviceId, models} = req.body,
        data=models.map(model=>[serviceId, model]);

        this.db.query(`INSERT INTO auto_${req.params.orgid}.services_model (id_service, id_mark) VALUES ?`, [data])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
}
module.exports = ServiceModelsController;