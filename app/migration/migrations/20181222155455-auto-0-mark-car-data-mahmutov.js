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
const marks = [{
    name:'Lada',
    models:[
        {name:'Granta'},
        {name:'Vesta'},
        {name:'XRAY'},
        {name:'Largus'},
        {name:'Niva 4x4'},
    ]
},
    {
        name:'Ford',
        models:[
            {name:'Focus'},
            {name:'Mondeo'},
            {name:'Kuga'},
        ]
    }, {
        name:'Hyundai',
        models:[
            {name:'Solaris'},
            {name:'Elantra'},
            {name:'Sonata'},
        ]
    }, {
        name:'Kia',
        models:[
            {name:'Rio'},
            {name:'Ceed'},
            {name:'Sorento'},
        ]
    }, {
        name:'Volkswagen',
        models:[
            {name:'Polo'},
            {name:'Golf'},
            {name:'Passat'},
        ]
    }];
exports.up = function (db, callback)
{
    let promises = [];
    marks.forEach(value=>{
        promises.push(db.insert('cars', ['name'], [value.name], ()=>{}).then(row=>{
            let promises = [];

            value.models.forEach(model=>{
                promises.push(db.insert('models', ['name', 'id_car'], [model.name, row.insertId], ()=>{}));
            });
            return Promise.all(promises);
        }))
    });
    Promise.all(promises)
        .then(function(res){
             callback();
         })
        .catch(function(err){
            console.log(err);
            callback();
        });
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
