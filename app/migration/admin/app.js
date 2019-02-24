const DBMigrate = require('db-migrate');
const db = require('../../db.js');
let dbconfigmigration = require('./database.json');
let dbconfig = require("../../db.config.json");

let pass = {
    development:'123',
    production:'VzLuU3xNrbWJtku'
};

dbconfigmigration.dev.password = pass[process.env.NODE_ENV];
dbconfigmigration.dev.user = dbconfig.user;
dbconfigmigration.dev.host = dbconfig.host;

module.exports = new Promise(function(res, rej){
    console.log(`\nStart migrations organization №: admin`);

    DBMigrate
        .getInstance(true, dbconfigmigration)
        .up()
        .then(function(){
            console.log(`Success migrations organization №: admin`);
            db.close();
        })
        .catch(()=>db.close());
});