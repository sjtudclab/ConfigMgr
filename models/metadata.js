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
var tableRelationship = config.get('table_relationship');
exports.createEntity = function(name, tableName, description, category) {
    return Promise.resolve(knex.insert({name: name,
                                        'table_name': tableName,
                                        description: description,
                                        category: category},'id')
            .into(tableEntity));
};

exports.updateEntity = function(id, name, tableName, description, category) {
    return Promise.resolve(knex(tableEntity).where('id',id).update({
        name: name,
        'table_name': tableName,
        description: description,
        category: category
    }));
};

exports.removeEntity = function(id) {
    return Promise.resolve(knex(tableEntity).where('id',id).del());
};

exports.createProperty = function(name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    console.log(knex.raw('insert into `meta_property` (`_range_table`, `allow_null`, `auto_increment`, `comment`, `default`, `is_primary`, `length`, `meta_entity_id`, `name`, `type`) values ' +
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
        '\')').toSQL());
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

exports.updateProperty = function(id, name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    return Promise.resolve(knex(tableProperty).where('id',id).update({
        name: name,
        type: type,
        length: length,
        is_primary: isPrimary,
        allow_null: allowNull,
        auto_increment: autoInc,
        comment: comment,
        'default': defaultVal
    }));
};
exports.getEntities = function(categoryId) {
    return knex.select('*').from(tableEntity).where('category',categoryId);
};

exports.getPropertiesByEntityId = function(entityId) {
    return Promise.resolve(knex.select('*')
        .from(tableProperty).where('meta_entity_id', entityId));
};

exports.getAllCommunities = function() {
    return Promise.resolve(knex.select('*').from(tableEntity)
        .where('table_name','community'));
};

exports.getCommunityById = function(id) {
    return Promise.resolve(knex.select('*').from(tableEntity).where('id',id));
};

exports.removeProperty = function(id) {
    return Promise.resolve(knex(tableProperty).where('id',id).del());
};

exports.getRelationships = function() {
    return Promise.resolve(knex(tableRelationship).select('*'));
};
