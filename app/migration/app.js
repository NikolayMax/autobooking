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
        var promises = [];

        results.forEach(value=>{
            if(typeof value['id'] !== 'number')
                return;

            dbconfigmigration.dev.database = `${dbconfigmigration.prefixdb}_${value['id']}`;

            promises.push(DBMigrate.getInstance(true, dbconfigmigration).up().then(res=>{
                console.log(`\nEnd migrations organization №: ${value['id']}`);
            }))
        });

        return Promise.all(promises);
    })
    .then(function(){
        if(!db.closed)
            db.close();
    })
    .catch((err)=>{
        console.log(err);
        if(!db.closed)
            db.close();
    });