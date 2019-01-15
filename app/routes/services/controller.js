class ServiceController{
    constructor(db){
        this.db = db;
    }
    getServicesForOrgId(req, res, next){
        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }

       this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{
                if(results.length)
                    return this.db.query('SELECT * FROM auto_'+req.params.orgid+'.services_car');
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
}
module.exports = ServiceController;