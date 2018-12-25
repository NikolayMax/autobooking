class ServiceController{
    constructor(db){
        this.db = db;
    }
    getServicesForOrgId(req, res, next){
        if(!req.query.orgid)
            return next('Не найдена организация '+req.query.orgid);

        this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.query.orgid])
            .then((results)=>{
                if(results.length)
                    return this.db.query('SELECT * FROM auto_'+req.query.orgid+'.services_car');
                else
                    return new Promise(function(res, rej){rej('Не найдена организация '+req.query.orgid)});
            })
            .then(function (results){
                res.status(200).send(results);
            })
            .catch(function(err){
                next(err)
            });
    }
}
module.exports = ServiceController;