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
    db.createTable('visit_item', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        'service_name': 'string',
        'service_duration':'string',
        'service_pay_sum':'real',
        'name_car':'string',
        'name_model':'string',
        'visit_id':'int',
    }, callback)
};

exports.down = function(db, callback) {
    db.dropTable('visit_item', {}, callback)
};

exports._meta = {
    "version": 1
};
