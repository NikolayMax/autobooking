module.exports = class{
    isOrgid(req, res, next){
        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }
        this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{
                if(results[0])
                    next();
                else
                    next('Не найдена организация '+req.params.orgid);
            })
            .catch(err=>{
                next(err)
            })
    }
};