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
    db.createTable('services_cars', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        'id_service': { type: 'int'},
        'id_car': { type: 'int'},
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('services_cars', {}, callback)
};

exports._meta = {
    "version": 1
};