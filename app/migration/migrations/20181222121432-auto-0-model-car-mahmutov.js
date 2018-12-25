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
    db.createTable('model_car', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        name: 'string',
        'id_mark': { type: 'int'},
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('model_car', {}, callback)
};


exports._meta = {
  "version": 1
};
