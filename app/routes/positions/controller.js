class PositionController{
    constructor(db){
        this.db = db;
    }
    getPositions(req, res, next){
        this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{

                if(results.length)
                    return this.db.query('SELECT * FROM auto_'+req.params.orgid+'.positions');
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
    addPosition(req, res, next){
        let {name, comment} = req.body;

        this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{

                if(results.length)
                    return this.db.query(`INSERT INTO auto_${req.params.orgid}.positions(name, comment) VALUES(?, ?)`, [name, comment]);
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
    isOrgid(req, res, next){
        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }
        next()
    }
}
module.exports = PositionController;