var metadata = require('../models/metadata');
exports.createEntity = function(name, tableName, description, categoty) {
    return metadata.createEntity(name, tableName, description, categoty);
};

exports.updateEntity = function(id, name, tableName, description, categoty) {
    return metadata.updateEntity(id, name, tableName, description, categoty);
};

exports.removeEntity = function(id) {
    return metadata.removeEntity(id);
};

exports.createProperty = function(payload) {
    // name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    console.log('0000000000payload-00000000000');
    console.log(payload);
    var name = payload.name;
    var type = payload.type;
    var length = payload.length;
    var isPrimary = payload.isPrimary;
    var allowNull = payload.allowNull;
    var autoInc = payload.autoInc;
    var comment = payload.comment;
    var entityId = payload.entityId;
    var defaultVal = payload.defaultVal;
    var _rangeTable = payload._rangeTable;
    console.log(type);
    return metadata.createProperty(name, type, length, isPrimary, allowNull,
     autoInc, comment, entityId, defaultVal , _rangeTable);
};

exports.getAllCommunities = function() {
    return metadata.getAllCommunities();
};

exports.getCommunityById = function(id) {
    return metadata.getCommunityById(id);
};

exports.getEntities = function(categoryId) {
    return metadata.getEntities(categoryId);
};

exports.getPropertiesByEntityId = function(entityId) {
    return metadata.getPropertiesByEntityId(entityId);
};

exports.removeProperty = function(propertyId) {
    return metadata.removeProperty(propertyId);
};
