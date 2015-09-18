var metadata = require('../models/metadata');
exports.createEntity = function(name, tableName, description) {
    return metadata.createEntity(name, tableName, description);
};
