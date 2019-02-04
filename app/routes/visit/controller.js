let BaseController = require('../BaseController');

class VisitController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    create(req, res, next){
        let {services, car, model, date, time, user} = req.body;

        this.db.query(`SELECT * FROM auto_${req.params.orgid}.clients WHERE phone = ?`, [user.phone])
            .then(clients=>{
                if(clients.length)
                    return new Promise(res=>res(clients[0]));

                return this.db.query(`INSERT INTO auto_${req.params.orgid}.clients(firstname, lastname, patronymic, phone) VALUES(?, ?, ?, ?)`, [user.firstname, user.lastname, user.patronymic, user.phone])
            })
            .then(client=>{
                let idClient;
                if(client.id)
                    idClient = client.id;
                else if(client.insertId)
                    idClient = client.insertId;

                return this.db.query(`INSERT INTO auto_${req.params.orgid}.visits(id_client) VALUE(?)`, [idClient]);
            })
            .then(results=>{
                return this.db.query(`INSERT INTO auto_${req.params.orgid}.visit_item(service_name, service_duration, service_pay_sum, name_car, name_model, visit_id) VALUES ?`,
                    [services.map(service=>{
                        return [service.name, service.duration, service.price, car.name, model.name, results.insertId]
                    })]);

            })
            .then(results=>{
                res.json('ok');
            })
            .catch(err => {
                next(err);
            });

    }
}
module.exports = VisitController;