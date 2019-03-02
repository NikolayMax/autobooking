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
    db.createTable('services', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        price: 'real',
        duration: 'string',
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('services', {}, callback)
};

exports._meta = {
  "version": 1
};
