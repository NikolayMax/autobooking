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
        console.log(times);
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
        let {services, car, model, date, time, user, employee} = req.body;
        let { orgid } = req.params;
        let times;

        this.db.query(`SELECT * FROM auto_${orgid}.clients WHERE phone = ?`, [user.phone])
            .then(clients=>{
                if(clients.length)
                    return new Promise(res=>res(clients[0]));

                return this.db.query(`INSERT INTO auto_${orgid}.clients(firstname, lastname, patronymic, phone) VALUES(?, ?, ?, ?)`, [user.firstname, user.lastname, user.patronymic, user.phone])
            })
            .then(client=>{
                let idClient;
                if(client.id)
                    idClient = client.id;
                else if(client.insertId)
                    idClient = client.insertId;

                times = services.map(service=>service.duration);
                times.push(time);
                return this.db.query(`INSERT INTO auto_${orgid}.visits(id_client, startTime, endTime, date) VALUE(?, ?, ?, ?)`, [idClient, time, this.summaryMinutes(times), date]);
            })
            .then(results=> this.db.query(`INSERT INTO auto_${orgid}.visit_item(name, duration, pay_sum, name_car, name_model, visit_id, employee_id, startTime, endTime) VALUES ?`,
                    [services.map(service => [service.name, service.duration, service.price, car.name, model.name, results.insertId, employee.id, service.startTime, service.endTime])]))
            .then(() => res.json())
            .catch(err => next(err));

    }

    list(req, res, next){
        let { date, employee } = req.query;
        let { orgid } = req.params;

        let query = `SELECT * FROM auto_${orgid}.visits`,
            params = [];

        if(date){
            query = `SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM auto_${orgid}.visits WHERE date = DATE_FORMAT(?, '%Y-%m-%d')`;
            params.push(date);
        }
        let visits = [];

        this.db.query(query, params)
            .then(rows=>{
                visits=rows;
                if(!rows.length){
                    res.json(rows);
                    return Promise.reject();
                }

                let query =`SELECT * FROM auto_${orgid}.visit_item WHERE visit_id IN (?)`,
                    params = [rows.map(row=>row.id)];
                if(employee){
                    query =`SELECT * FROM auto_${orgid}.visit_item WHERE visit_id IN (?) AND employee_id = ?`;
                    params.push(employee);
                }
                return this.db.query(query, params);
            })
            .then(rows=>{
                visits.forEach(visit=>{
                    visit.visitItems = rows.filter(row=>row.visit_id === visit.id);
                });
                res.json(visits);
            })
    }
    visitItems(req, res, next){
        let { orgid } = req.params;

        this.db.query(`SELECT * FROM auto_${orgid}.visit_item WHERE visit_id = ?`, [req.query.visitId])
            .then(visits=>{
                res.json(visits);
            })
    }
    client(req, res, next){
        let { orgid } = req.params;

        this.db.query(`SELECT c.* FROM auto_${orgid}.visits AS v LEFT JOIN auto_${orgid}.clients AS c ON v.id_client = c.id WHERE v.id = ?`, [req.query.visitId])
            .then(client=>{
                res.json(client[0]);
            })
    }
}
module.exports = VisitController;