var Promise = require('bluebird');
var metadataService = require('../service/metadataService');

var titleList = ['社区定义','邻里社交','公共服务','便民服务','支付信息','身份管理'];
exports.getEntities = function(req, res, next) {
    var categoryId = req.params.id;
    console.log('------- categoryId ' + categoryId);
    var title = titleList[categoryId - 1];
    metadataService.getEntities(categoryId).then(function(rows) {
        var properties = [];
        if (rows && rows.length > 0) {
            for (var i = 0 ; i < rows.length ; i++) {
                properties.push(
                    metadataService.getPropertiesByEntityId(rows[i].id));
            }
        }
        Promise.all(properties).then(function(properties) {
            if (rows && rows.length > 0) {
                for (var i = 0 ; i < rows.length ; i++) {
                    rows[i].properties = properties[i];
                }
            }
            console.log('------------- entities with properties ');
            console.log(rows);
            res.render('entity_detail', {
                subtitle: title + '实体列表',
                entities: rows
            });
        });
    });
};
exports.index = function(req, res) {
    var community = Promise.pending();
    var communityId = req.query.id;
    metadataService.getCommunityById(communityId).then(function(res) {
        if (res && res.length > 0) {
            community.resolve(res[0]);
        } else {
            community.reject(res);
        }
    });
    function resolveFun(community) {
        console.log('community-------------');
        console.log(community);
        res.cookie('communityId', community.id);
        res.cookie('communityName', community.name);
        res.redirect('/meta/newEntity');
    }

    function rejectFun() {
        metadataService.getAllCommunities().then(function(communities) {
            console.log('---success get all communities---');
            res.render('index',{
                title: '社区基础数据管理系统',
                communities: communities
            });
        });
    }

    community.promise.then(resolveFun, rejectFun);
};

exports.getRelationship = function(req, res) {
    metadataService.getRelationships().then(function(rls) {
        res.render('manage_relationship', {
            relationships: rls
        });
    });
};
/*API*/
exports.createEntity = function(req, res) {
    var name = req.body.name;
    var tableName = req.body.tableName;
    var description = req.body.description;
    var category = req.body.category;
    console.log(req);
    console.log('00000000000000res');
    console.log(res);
    return metadataService.createEntity(name, tableName, description, category).then(function(id) {
        console.log('--success insert entity');
        res.send({
            message: '成功创建实体',
            status: 'success',
            name: name ,
            id: id
        });
    });
};

exports.updateEntity = function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var tableName = req.body.tableName;
    var description = req.body.description;
    var category = req.body.category;
    return metadataService.updateEntity(id,name, tableName, description, category).then(function(id) {
        console.log('--success update entity');
        res.send({
            message: '成功更新实体',
            status: 'success',
            name: name ,
            id: id
        });
    });
};

exports.removeEntity = function(req, res) {
    var id = req.body.id;
    console.log(id);
    return metadataService.removeEntity(id).then(function(id) {
        console.log('--success remove entity');
        res.send({
            message: '成功删除实体',
            status: 'success'
        });
    });
};
exports.createProperty = function(req, res) {
    var payload = {};
    payload.name = req.body.name;
    payload.type = req.body.type;
    payload.length = req.body.length;
    payload.isPrimary = req.body.isPrimary;
    payload.allowNull = req.body.allowNull;
    payload.autoInc = req.body.autoInc;
    payload.comment = req.body.comment;
    payload.entityId = req.body.entityId;
    payload.defaultVal = req.body.defaultVal;
    payload._rangeTable = req.body._rangeTable;
    console.log(payload);
    return metadataService.createProperty(payload).then(function(obj) {
        console.log('--success inserte property');
        console.log(obj[0].insertId);
        res.send({
            message: '成功创建',
            status: 'success',
            propertyId: obj[0].insertId,
            redirect: '/meta/newEntity'
        });
    });
};

exports.updateProperty = function(req, res) {
    var payload = {};
    payload.id = req.body.id;
    payload.name = req.body.name;
    payload.type = req.body.type;
    payload.length = req.body.length;
    payload.isPrimary = req.body.isPrimary;
    payload.allowNull = req.body.allowNull;
    payload.autoInc = req.body.autoInc;
    payload.comment = req.body.comment;
    payload.entityId = req.body.entityId;
    payload.defaultVal = req.body.defaultVal;
    payload._rangeTable = req.body._rangeTable;
    console.log(payload);
    return metadataService.updateProperty(payload).then(function(id) {
        console.log('--success inserte property');
        res.send({
            message: '成功更新属性',
            status: 'success'
        });
    });
};

exports.removeProperty = function(req, res) {
    var propertyId = req.body.propertyId;
    return metadataService.removeProperty(propertyId).then(function() {
        res.send({
            message: '成功删除属性',
            status: 'success'
        });
    });
};
