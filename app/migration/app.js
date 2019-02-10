var DBMigrate = require('db-migrate');
const path = require('path');
const exec = require('child_process').exec;
const db = require(path.resolve(`${__dirname}/../db.js`));
const async = require("async");
const fs = require('fs');
let dbconfigmigration = require(path.resolve(`${__dirname}/database`));
let dbconfig = require(path.resolve(`${__dirname}/../db.config.json`));


dbconfigmigration.dev.password = dbconfig.password;
dbconfigmigration.dev.user = dbconfig.user;
dbconfigmigration.dev.host = dbconfig.host;

db.query('select * from `auto_admin`.`organizations`')
    .then(function(results){
        var promise = new Promise(function(res){
            res();
        });

        async.forEachOf(results, (value, key, callback)=>{
            if(typeof value['id'] !== 'number')
                return;

            promise = promise.then(()=>{
                console.log(`\nStart migrations organization №: ${value['id']}`);
                dbconfigmigration.dev.database = `${dbconfigmigration.prefixdb}_${value['id']}`;

                return DBMigrate
                        .getInstance(true, dbconfigmigration)
                        .up()
                        .then(function(){
                            if(key == results.length-1 && !db.closed)
                                db.close();
                        })
                        .catch(function(err){
                            console.log(err)
                        })
            })
        });
    })
    .catch((err)=>{
        if(!db.closed)
            db.close();
    });