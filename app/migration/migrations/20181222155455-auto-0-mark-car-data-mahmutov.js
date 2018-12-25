'use strict';
let async = require("async");
var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
const marks = ['Lada', 'Audi', 'BMW', 'Ford', 'Hyundai', 'Kia', 'Mercedes-Benz', 'Mitsubishi', 'Toyota', 'Volkswagen'];
exports.up = function (db, callback)
{
    let arr = [];
    async.forEachOf(marks, function(value, key){
        arr.push(db.insert.bind(db,'mark_car', ['name'], [value]));
    });
    async.series(arr, callback);
};

//with options object
exports.down = function (db, callback)
{
    console.log(db)
    //db.runSql(`DELETE FROM mark_car WHERE name=(${marks.join(', ')})`, [], callback)
};

exports._meta = {
  "version": 1
};
