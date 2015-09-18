var Promise = require('bluebird');
var config = require('config').get('mysql');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: config.get('host'),
        user: config.get('user'),
        password: config.get('password'),
        database: config.get('meta_database')
    }
});
var tableEntity = config.get('table_entity');
exports.createEntity = function(name, tableName, description) {
    return Promise.resolve(knex.insert({name: name,
                                        'table_name': tableName,
                                        description: description},'id')
            .into(tableEntity));
};
