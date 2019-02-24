var DBMigrate = require('db-migrate');
const path = require('path');
const exec = require('child_process').exec;
const db = require(path.resolve(`${__dirname}/../db.js`));
const async = require("async");
const fs = require('fs');
let dbconfigmigration = require(path.resolve(`${__dirname}/database`));
let dbconfig = require(path.resolve(`${__dirname}/../db.config.json`));

let pass = {
    'development':'123',
    'production':'VzLuU3xNrbWJtku'
};

dbconfigmigration.dev.password = pass[process.env.NODE_ENV];
dbconfigmigration.dev.user = dbconfig.user;
dbconfigmigration.dev.host = dbconfig.host;

db.query('select * from `auto_admin`.`organizations`')
    .then(function(results){
        var promises = [];

        results.forEach((value)=>{
            if(typeof value['id'] !== 'number')
                return;

            dbconfigmigration.dev.database = `${dbconfigmigration.prefixdb}_${value['id']}`;

            promises.push(DBMigrate.getInstance(true, dbconfigmigration).up())
        });
        return Promise.all(promises)
    })
    .then(function(r){
        console.log(r)
        if(!db.closed)
            db.close();
    })
    .catch((err)=>{
        console.log(err);
        if(!db.closed)
            db.close();
    });