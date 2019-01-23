let BaseController = require('../BaseController');

class CarsController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getCars(req, res, next){
        this.db.query('SELECT * FROM auto_'+req.params.orgid+'.cars')
            .then(results => res.json(results))
            .catch(err => next(err));
    }
    saveCar(req, res, next){
        let {name, marks} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}.cars(name) VALUE(?)`, [name])
            .then(result =>{
                let maps = marks.map(item=> [item, result.insertId]);
                return this.db.query(`INSERT INTO auto_${req.params.orgid}.models(name, id_mark) VALUE(?)`, maps);
            })
            .then(result=>res.json(result))
            .catch(err => next(err));
    }

}
module.exports = CarsController;