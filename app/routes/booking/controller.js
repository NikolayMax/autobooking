let BaseController = require('../BaseController');

class BookingController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    timeIntervals(req, res, next) {
        this.db.query(`SELECT startTime, endTime, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM auto_${req.params.orgid}.visits WHERE date = DATE_FORMAT(?, '%Y-%m-%d')`, [req.params.date])
            .then(visits=>{
                res.json(visits);
            })
            .catch(err=>{
                next(err)
            })
    }
}
module.exports = BookingController;