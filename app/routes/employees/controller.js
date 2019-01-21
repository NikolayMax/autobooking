class EmployeesController{
    constructor(db){
        this.db = db;
    }
    isOrgid(req, res, next){
        if(!req.params.orgid)
            return next('Не найдена организация '+req.params.orgid);

        if(/[^0-9]/g.test(req.params.orgid)){
            return next('Не найдена организация '+req.params.orgid);
        }
        this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{
                console.log(results);
                if(results.length)
                    next();
                else
                    next('Не найдена организация '+req.params.orgid);
            })
    }
    getEmployees(req, res, next){
        console.log(req);

       this.db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.params.orgid])
            .then((results)=>{

                if(results.length)
                    return this.db.query('SELECT * FROM auto_'+req.params.orgid+'.employees');
                else
                    return new Promise((res, rej) => rej('Не найдена организация '+req.params.orgid));
            })
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
    addEmployee(req, res, next){
        let {firstname, lastname, patronymic, phone, password, position} = req.body;

        this.db.query(`INSERT INTO auto_${req.params.orgid}(lastname, firstname, patronymic, email, password, phone) VALUES(?, ?, ?, ?, ?, ?)`, [lastname, firstname, patronymic, email, password, phone])
            .then(results => res.status(200).send(results))
            .catch(err => next(err));
    }
}
module.exports = EmployeesController;