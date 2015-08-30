var config = require('config').get('mysql');
var mysql = require('mysql');
var Promise = require('bluebird');

exports.createNewCommunity = function(host, username, password, port, db,
                                    name, provinceCityArea, address) {
    var ret = Promise.pending();
    var newHost = host || config.get('host');
    var newUser = username || config.get('user');
    var newPassword = password || config.get('password');
    var newPort = port || config.get('port');
    var newDatabase = config.get('fixeddb');
    var connection = mysql.createConnection({
        host: newHost,
        user: newUser,
        password: newPassword,
        port: newPort,
        database: newDatabase
    });

    var queryInsertCommunity = 'INSERT INTO `community` ' +
                    '(`community_id`, `name`, `province_city_area`' +
                    ', `address`, `db_host`, `db_user`, `db_password`, ' +
                    '`db_port`, `db_name`) ' +
                    'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    connection.query(queryInsertCommunity,[null, name, provinceCityArea
        , address, newHost, newUser, newPassword, newPort, newDatabase],
        function(err, result) {
            if (err) {
                console.log(err);
                ret.resolve({
                    status: 'error',
                    message: '插入数据库错误 ',
                    detail: err
                });
            } else {
                console.log('success in dao insert new community');
                ret.resolve({
                    status: 'success',
                    message: '初始化数据库成功',
                    result: result
                });
            }
        });

    return ret.promise;
};
