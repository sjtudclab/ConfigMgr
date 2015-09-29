var metadata = require('../models/metadata');
exports.createEntity = function(name, tableName, description, categoty) {
    return metadata.createEntity(name, tableName, description, categoty);
};

exports.updateEntity = function(id, name, tableName, description, categoty) {
    return metadata.updateEntity(id, name, tableName, description, categoty);
};

exports.createProperty = function(payload) {
    // name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    console.log('0000000000payload-00000000000');
    console.log(payload);
    var name = payload.name;
    var type = payload.type;
    var length = payload.length;
    var isPrimary = payload.isPrimary == 'true' ? 1 : 0;
    var allowNull = payload.allowNull == 'true' ? 1 : 0;
    var autoInc = payload.autoInc == 'true' ? 1 : 0;
    var comment = payload.comment;
    var entityId = payload.entityId;
    var defaultVal = payload.defaultVal;
    var _rangeTable = payload._rangeTable;
    console.log(isPrimary);
    console.log(allowNull);
    console.log(autoInc);
    return metadata.createProperty(name, type, length, isPrimary, allowNull,
     autoInc, comment, entityId, defaultVal , _rangeTable);
};

exports.updateProperty = function(payload) {
    // name, type, length, isPrimary, allowNull, autoInc, comment, entityId, defaultVal, _rangeTable) {
    console.log('0000000000payload-00000000000');
    console.log(payload);
    var id = payload.id;
    var name = payload.name;
    var type = payload.type;
    var length = payload.length;
    var isPrimary = payload.isPrimary == 'true' ? 1 : 0;
    var allowNull = payload.allowNull == 'true' ? 1 : 0;
    var autoInc = payload.autoInc == 'true' ? 1 : 0;
    var comment = payload.comment;
    var entityId = payload.entityId;
    var defaultVal = payload.defaultVal;
    var _rangeTable = payload._rangeTable;
    console.log(type);
    return metadata.updateProperty(id, name, type, length, isPrimary, allowNull,
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

exports.getRelationships = function() {
    return metadata.getRelationships();
};

exports.createRelationship = function(name, tableId, propertyId, fkTableId, fkPropertyId) {
    return metadata.createRelationship(name, tableId, propertyId, fkTableId, fkPropertyId);
};
