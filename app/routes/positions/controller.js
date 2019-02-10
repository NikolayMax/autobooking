const BaseController = require('../BaseController');

class PositionController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    getPositions(req, res, next){
        this.db.query('SELECT * FROM auto_'+req.params.orgid+'.positions')
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
    addPosition(req, res, next){
        let {name, comment} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}.positions(name, comment) VALUES(?, ?)`, [name, comment])
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
}
module.exports = PositionController;