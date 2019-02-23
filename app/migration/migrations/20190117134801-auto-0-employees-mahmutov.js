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
    db.createTable('employees', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        lastname: 'string',
        firstname: 'string',
        patronymic: 'string',
        email: 'string',
        password: 'string',
        phone: 'string',
        position_id: 'int',
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('employees', {}, callback)
};

exports._meta = {
  "version": 1
};
