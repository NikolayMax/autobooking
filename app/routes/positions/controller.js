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
    changePosition(req, res, next){
        let {name, comment, id} = req.body;
        console.log(name, comment, id)

        this.db.query(`UPDATE auto_${req.params.orgid}.positions SET name = ?, comment = ? WHERE id = ?`, [name, comment, id])
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
    delete(req, res, next){
        let {id} = req.params;

        this.db.query(`DELETE FROM auto_${req.params.orgid}.positions WHERE id = ?`, [id])
            .then(results => res.json(results))
            .catch(err => next(err));
    }
}
module.exports = PositionController;