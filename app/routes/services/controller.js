let BaseController = require('../BaseController');

class ServiceController extends BaseController{
    constructor(db){
        super();
        this.db = db;
    }
    joinEmployees(req, res, next){
        return services => {
            let {orgid} = req.params;

            return this.db.query(`SELECT e.*, se.id_service FROM auto_${orgid}.services_employees AS se LEFT JOIN auto_${orgid}.employees AS e ON se.id_employee = e.id`)
                .then(rows=> Promise.resolve(services.map(service=>{

                    service.employees = rows.filter(x => x.id_service === service.id);

                    return service;
                })))
        }
    }
    joinCars(req, res, next){
        let {orgid} = req.params,
            cars = [];
        return services => this.db.query(`SELECT c.*, sc.id_service FROM auto_${orgid}.services_cars AS sc LEFT JOIN auto_${orgid}.cars AS c ON sc.id_car = c.id`)
            .then(rows => {
                cars = rows;
                return this.db.query(`SELECT m.*, sm.id_service FROM auto_${orgid}.services_model AS sm LEFT JOIN auto_${orgid}.models AS m ON sm.id_model = m.id`)
            })
            .then(rows => {
                cars.forEach(car =>{
                    car.models = rows.filter(model => model.id_car === car.id && car.id_service === model.id_service);
                });
                services.forEach(service => {
                    service.cars = cars.filter(car => car.id_service === service.id)
                });
                return Promise.resolve(cars);
            })
    }
    getServices(req, res, next){
        let {orgid} = req.params;
        let services = [];

        this.db.query(`SELECT * FROM auto_${orgid}.services`)
           .then(rows=>{
               services = rows;

               return this.joinEmployees(req, res, next)(services)
           })
            .then(rows => this.joinCars(req, res, next)(services))
            .then(rows => res.json(services))
            .catch(err => next(err));
    }
    deleteService(req, res, next){
        let {id, orgid} = req.params;

        this.db.query(`DELETE FROM auto_${orgid}.services WHERE id = ?`, [id])
            .then(() => this.db.query(`DELETE FROM auto_${orgid}.services_employees WHERE id_service = ?`, [id]))
            .then(() => this.db.query(`DELETE FROM auto_${orgid}.services_model WHERE id_service = ?`, [id]))
            .then(() => this.db.query(`DELETE FROM auto_${orgid}.services_cars WHERE id_service = ?`, [id]))
            .then(() => res.json())
            .catch(err => next(err));
    }
    changeService(req, res, next){
        let {name, price, duration, id} = req.body;

        this.db.query(`UPDATE auto_${req.params.orgid}.services SET name = ?, price = ?, duration = ? WHERE id = ?`, [name, price, duration, id])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
    addService(req, res, next){
        let {name, price, duration} = req.body;
        price = price || 0;
        this.db.query(`INSERT INTO auto_${req.params.orgid}.services (name, price, duration) VALUES(?, ?, ?)`, [name, price, duration])
            .then(results => {
                res.json(results)
            })
            .catch(err => {
                next(err)
            });
    }
}
module.exports = ServiceController;