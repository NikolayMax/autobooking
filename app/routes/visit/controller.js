let BaseController = require('../BaseController');

class VisitController extends BaseController{
    constructor(db){
        super();
        this.db = db;

    }
    MinutesToString(number) {
        var hours = Math.floor(number / 60);

        if (hours.toString().length === 1) {
            hours = '0' + hours;
        }

        var minutes = number % 60;

        if (minutes.toString().length === 1) {
            minutes = '0' + minutes;
        }

        return hours + ":" + minutes;
    }
    summaryMinutes(times){
        let hourse=0,minutes=0, d = new Date();
        times.forEach(time=>{
            let h = time.split(':')[0]*1;
            let m = time.split(':')[1]*1;
            hourse+=h;
            minutes+=m;
        });
        d.setHours(hourse);
        d.setMinutes(minutes);

        return this.MinutesToString(d.getHours()*60+d.getMinutes())
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

                var times = services.map(service=>service.duration);
                times.push(time);
                return this.db.query(`INSERT INTO auto_${req.params.orgid}.visits(id_client, startTime, endTime, date) VALUE(?, ?, ?, ?)`, [idClient, time, this.summaryMinutes(times), date]);
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
                console.log(err)
                next(err);
            });

    }
    list(req, res, next){
        this.db.query(`SELECT * FROM auto_${req.params.orgid}.visits`)
            .then(visits=>{
                res.json(visits);
            })
    }
    visitItems(req, res, next){
        this.db.query(`SELECT * FROM auto_${req.params.orgid}.visit_item WHERE visit_id = ?`, [req.query.visitId])
            .then(visits=>{
                res.json(visits);
            })
    }
    client(req, res, next){
        this.db.query(`SELECT c.* FROM auto_${req.params.orgid}.visits AS v LEFT JOIN auto_${req.params.orgid}.clients AS c ON v.id_client = c.id WHERE v.id = ?`, [req.query.visitId])
            .then(client=>{
                res.json(client[0]);
            })
    }
}
module.exports = VisitController;