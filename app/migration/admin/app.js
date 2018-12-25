var DBMigrate = require('db-migrate');
const db = require('../../db.js');
let dbconfigmigration = require('./database');
let dbconfig = require("../../db.config.json");

dbconfigmigration.dev.password = dbconfig.password;
dbconfigmigration.dev.user = dbconfig.user;
dbconfigmigration.dev.host = dbconfig.host;

console.log(`\nStart migrations organization №: admin`);

DBMigrate
    .getInstance(true, dbconfigmigration)
    .up()
    .then(function(){
        console.log(`Success migrations organization №: admin`);
        if(!db.closed)
            db.close();
    })
    .catch((err)=>{
    console.log(err)
        if(!db.closed)
            db.close();
    });
module.exports = {};