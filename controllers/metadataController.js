var dao = require('../service/dao');
var metadataService = require('../service/metadataService');
exports.getEntities = function(req, res, next) {
    dao.getEntities().then(function(rows) {
        res.render('new_entity', {
            title: '新建实体',
            entities: rows
        });
    });
};

exports.createEntity = function(req, res) {
    var name = req.body.name;
    var tableName = req.body.tableName;
    var description = req.body.description;
    console.log(req);
    console.log('00000000000000res');
    console.log(res);
    return metadataService.createEntity(name, tableName, description).then(function(id) {
        console.log('--success inserte entity');
        res.send({
            message: '成功创建实体',
            status: 'success',
            name: name ,
            id: id,
            redirect: '/meta/newEntity'
        });
    });
};
