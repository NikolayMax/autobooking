'use strict';

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

exports.up = function(db, callback) {
    db.createTable('services_car', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        'id_mark': { type: 'int'},
        price: 'real',
        diration: 'string',
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('services_car', {}, callback)
};

exports._meta = {
  "version": 1
};
