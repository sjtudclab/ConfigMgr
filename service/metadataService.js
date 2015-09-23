var metadata = require('../models/metadata');
exports.createEntity = function(name, tableName, description) {
    return metadata.createEntity(name, tableName, description);
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
