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
var tableProperty = config.get('table_property');
exports.createEntity = function(name, tableName, description) {
    return Promise.resolve(knex.insert({name: name,
                                        'table_name': tableName,
                                        description: description},'id')
            .into(tableEntity));
};

exports.createProperty = function(name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    // console.log(knex.insert({
    //     'name': name,
    //     'type': type,
    //     'length': length,
    //     'is_primary': isPrimary,
    //     'allow_null': allowNull,
    //     'auto_increment': autoInc,
    //     'comment': comment,
    //     'meta_entity_id': entityId,
    //     'default': defaultVal,
    //     '_range_table': _rangeTable}).into(tableProperty).toSQL());
    // console.log('table_property:' + tableProperty);
    // return Promise.resolve(knex.insert({
    //     'name': name,
    //     'type': type,
    //     'length': length,
    //     'is_primary': isPrimary,
    //     'allow_null': allowNull,
    //     'auto_increment': autoInc,
    //     'comment': comment,
    //     'meta_entity_id': entityId,
    //     'default': defaultVal,
    //     '_range_table': _rangeTable}))
    //     .into(tableProperty);

    console.log(knex.raw('insert into `meta_property` (`_range_table`, `allow_null`, `auto_increment`, `comment`, `default`, `is_primary`, `length`, `meta_entity_id`, `name`, `type`) values ' +
        '(' + _rangeTable +
            ',' + allowNull +
            ',' + autoInc +
            ',' + comment +
            ',' + defaultVal +
            ',' + isPrimary +
            ',' + length +
            ',' + entityId +
            ',' + name +
            ',' + type +
        ')').toSQL());
    return Promise.resolve(knex.raw('insert into `meta_property` (`_range_table`, `allow_null`, `auto_increment`, `comment`, `default`, `is_primary`, `length`, `meta_entity_id`, `name`, `type`) values ' +
        '(\'' + _rangeTable +
            '\',\'' + allowNull +
            '\',\'' + autoInc +
            '\',\'' + comment +
            '\',\'' + defaultVal +
            '\',\'' + isPrimary +
            '\',\'' + length +
            '\',\'' + entityId +
            '\',\'' + name +
            '\',\'' + type +
        '\')'
        ));
};
