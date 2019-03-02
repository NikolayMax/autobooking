let BaseController = require('../BaseController');

class ServiceModelsController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    change(req, res, next){
        let {serviceId, cars} = req.body;

        this.db.query(`DELETE FROM auto_${req.params.orgid}.services_cars WHERE id_service = ?`, [serviceId])
            .then(()=>this.db.query(`SELECT * FROM auto_${req.params.orgid}.cars WHERE id IN (?)`, [cars]))
            .then(rows=>{
                let data=rows.map(car=>[serviceId, car.id]);
                this.db.query(`INSERT INTO auto_${req.params.orgid}.services_cars (id_service, id_car) VALUES ?`, [data])
            })
            .then(results => res.json(results))
            .catch(err => next(err));
    }
    save(req, res, next){
        let {serviceId, cars} = req.body;

        this.db.query(`SELECT * FROM auto_${req.params.orgid}.cars WHERE id IN (?)`, [cars])
            .then(rows=>{
                let data=rows.map(car=>[serviceId, car.id]);
                this.db.query(`INSERT INTO auto_${req.params.orgid}.services_cars (id_service, id_car) VALUES ?`, [data])
            })
            .then(results => res.json(results))
            .catch(err => next(err));
    }
}
module.exports = ServiceModelsController;