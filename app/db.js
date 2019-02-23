var mysql = require('mysql');
const mysqlUtilities = require('mysql-utilities');
var config = require("./db.config");
let pass = {
    'development':'123',
    'production':'VzLuU3xNrbWJtku'
};
config.password = pass[process.env.NODE_ENV];
class Database {
    constructor( config ) {

        this.connect();

        this.connection.on('error', (err)=>{
            console.log('db error', err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                console.log(err.code);
                this.connect();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
                throw err;                                  // server variable configures this)
            }
        });
    }
    connect(){
        console.log('Connect mysql!!\n');
        this.connection = mysql.createConnection(config);

        mysqlUtilities.upgrade(this.connection);

        mysqlUtilities.introspection(this.connection);
    }
    query( sql, args ) {
        return new Promise((resolve, reject ) => {
                this.connection.query( sql, args, ( err, rows ) => {
                    if ( err )
                        return reject( err.sqlMessage );
                    resolve( rows );
                });
            });
    }
    queryRow( sql, args ) {
        return new Promise((resolve, reject ) => {
            this.connection.queryRow( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err.sqlMessage );
                resolve( rows );
            });
        });
    }
    close() {
        return new Promise( ( resolve, reject ) =>{
            this.closed=true;
            this.connection.end( err => {
                    if ( err )
                        return reject( err );
                resolve();
            });
        });
    }
}
var db = new Database(config);

db.connection.connect();

module.exports = db;