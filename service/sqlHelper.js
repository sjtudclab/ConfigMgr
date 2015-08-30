/**
 * Created by Yongfeng on 8/27/15.
 */
var mysql = require('mysql');
var Promise = require('bluebird');
var config = require('config').get('mysql');
var fs = require('fs');
var util = require('util');
var initialSqlCfg = require('config').get('initial_sql');

var MYSQL_HOST = config.get('host');
var MYSQL_USER = config.get('user');
var MYSQL_PASSWORD = config.get('password');
var MYSQL_PORT = config.get('port');
var MYSQL_DB = config.get('database');

exports.testConnection = function(host, username, password, port, db) {
    console.log('-------' + host);
    console.log('-------' + username);
    console.log('-------' + password);
    console.log('-------' + port);
    console.log('-------' + db);
    MYSQL_HOST = host || MYSQL_HOST;
    MYSQL_USER = username || MYSQL_USER;
    MYSQL_PASSWORD = password || MYSQL_PASSWORD;
    MYQL_PORT = port || MYSQL_PORT;
    MYSQL_DB = db || MYSQL_DB;

    console.log('connecting to ' + MYSQL_HOST + ':' + MYQL_PORT +
     ' DB: ' + MYSQL_DB + ' using user:' + MYSQL_USER +
      ' and password:' + MYSQL_PASSWORD);

    var connection = mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT
    });

    return new Promise(function(resolve, reject) {
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                resolve({
                    status: 'error',
                    message: '连接错误',
                    detail: err.stack
                });
            }else {
                console.log('success');
                console.log('creating db :' + MYSQL_DB);

                connection.query('CREATE DATABASE IF NOT EXISTS ' +
                    MYSQL_DB, function(err, results) {
                    if (err) {
                        resolve({
                            status: 'error',
                            message: '创建数据库错误',
                            detail: err.stack
                        });
                    }
                    console.log('database ' + MYSQL_DB +
                        'created OR already exists.');
                });

                resolve({
                    status: 'success',
                    message: '连接数据库成功'
                });
            }

        });
    }) ;

};

exports.mysql = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    port: MYSQL_PORT,
    database: MYSQL_DB
});

exports.initializeTables = function(name, provinceCityArea, address) {
    var ret = Promise.pending();
    console.log('-------' + MYSQL_HOST);
    console.log('-------' + MYSQL_USER);
    console.log('-------' + MYSQL_PASSWORD);
    console.log('-------' + MYSQL_PORT);
    console.log('-------' + MYSQL_DB);
    console.log('-------' + name);
    console.log('-------' + provinceCityArea);
    console.log('-------' + address);
    var mysqlConnection = mysql.createConnection({
        multipleStatements: true,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        port: MYSQL_PORT,
        database: MYSQL_DB
    });

    fs.readFile(initialSqlCfg, 'utf8', function(err, data) {
        if (err) {
            ret.resolve({
                status: 'error',
                message: err
            });
        }
        mysqlConnection.query(data, function(err, result) {
            if (err) {
                ret.resolve({
                    status: 'error',
                    message: '初始化数据库错误 !',
                    detail: err
                });
            } else {
                /*初始化数据库成功后插入表*/
                var queryInsertCommunity = 'INSERT INTO `community` ' +
                    '(`community_id`, `name`, `province_city_area`' +
                    ', `address`, `db_host`, `db_user`, `db_password`, ' +
                    '`db_port`, `db_name`) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
                mysqlConnection.query(queryInsertCommunity,
                    [null,name,provinceCityArea,address
                    ,MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_PORT,MYSQL_DB]
                    , function(err, result) {
                        if (err) {
                            ret.resolve({
                                status: 'error',
                                message: '插入数据库错误 ',
                                detail: err
                            });
                        } else {
                            ret.resolve({
                                status: 'success',
                                message: '初始化数据库成功',
                                result: result
                            });
                        }
                    });

            }
        });
    });

    return ret.promise;
};

exports.MYSQL_DB = function() {
    return MYSQL_DB;
};
