let BaseController = require('../BaseController');

class CarsController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getCars(req, res, next){
        this.cars=[];
        this.db.query('SELECT * FROM auto_'+req.params.orgid+'.cars')
            .then(cars => {
                this.cars=cars;
                return this.db.query(`SELECT * FROM auto_${req.params.orgid}.models`);
            })
            .then(models=>{
                res.json(this.cars.map(car=>{
                    car['models'] = models.filter(model=>car.id === model['id_mark']);
                    return car;
                }))
            })
            .catch(err => next(err));
    }
    getModels(){

    }
    saveCar(req, res, next){
        let {name, marks} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}.cars(name) VALUE(?)`, [name])
            .then(result =>{
                let maps = marks.map(item=> [item, result.insertId]);

                return this.db.query(`INSERT INTO auto_${req.params.orgid}.models(name, id_mark) VALUES ?`, [maps]);
            })
            .then(result=>res.json(result))
            .catch(err => next(err));
    }
    delete(req, res, next){
        let {id} = req.params;

        this.db.query(`DELETE FROM auto_${req.params.orgid}.cars WHERE id = ?`, [id])
            .then(results => res.json(results))
            .catch(err => next(err));
    }

}
module.exports = CarsController;