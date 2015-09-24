var Promise = require('bluebird');
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
    return metadataService.createProperty(payload).then(function(id) {
        console.log('--success inserte property');
        res.send({
            message: '成功创建',
            status: 'success',
            redirect: '/meta/newEntity'
        });
    });
};

exports.index = function(req, res) {
    var community = Promise.pending();
    var communityId = req.query.id;
    metadataService.getCommunityById(communityId).then(function(res) {
        if (res && res.length > 0) {
            community.resolve(res);
        } else {
            community.reject(res);
        }
    });
    function resolveFun() {
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
