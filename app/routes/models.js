var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/models/getModels', function(req, res, next){
    if(!req.query.orgid)
        return next('Не найдена организация '+req.query.orgid);

    db.query('SELECT * FROM auto_admin.organizations WHERE organization_id = ?', [req.query.orgid])
        .then(function(results){
            if(results.length)
                return db.query('SELECT * FROM auto_'+req.query.orgid+'.model_car');
            else
                return new Promise(function(res, rej){rej('Не найдена организация '+req.query.orgid)});
        })
        .then(function (results){
            res.send(results)
        })
        .catch(function(err){
            next(err)
        });
});


module.exports = router;
