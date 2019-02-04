var DBMigrate = require('db-migrate');
const db = require('../db.js');
const async = require("async");
const fs = require('fs');
let dbconfigmigration = require('./database');
let dbconfig = require("../db.config.json");

dbconfigmigration.dev.password = dbconfig.password;
dbconfigmigration.dev.user = dbconfig.user;
dbconfigmigration.dev.host = dbconfig.host;

db.query('select * from `auto_admin`.`organizations`')
    .then(function(results){

        var promise = new Promise(function(res){
            res();
        });

        async.forEachOf(results, (value, key, callback)=>{
            if(typeof value['organization_id'] !== 'number')
                return;

            promise = promise.then(()=>{
                console.log(`\nStart migrations organization №: ${value['organization_id']}`);
                dbconfigmigration.dev.database = `${dbconfigmigration.prefixdb}_${value['organization_id']}`;

                return DBMigrate
                        .getInstance(true, dbconfigmigration)
                        .up()
                        .then(function(){
                            if(key == results.length-1 && !db.closed)
                                db.close();
                        })
            })
        });
    })
    .catch((err)=>{
        if(!db.closed)
            db.close();
    });