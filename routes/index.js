var express = require('express');
var util = require('util');
var router = express.Router();
var sqlHelper = require('../service/sqlHelper');
var dao = require('../service/dao');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index',
      {title: '社区基础数据管理系统'}
    );
});

router.get('/new', function(req, res, next) {
    res.render('new-community',
        {title: '新建社区'});
});

router.post('/new', function(req, res, next) {
    var host = req.body.host;
    var username = req.body.username;
    var password = req.body.password;
    var port = req.body.port;
    var database = req.body.database;

    var province = req.body.province;
    var city = req.body.city;
    var area = req.body.area;
    var address = req.body.address;

    var name = req.body.communityName;
    console.log('[name]' + name);

    var ret = sqlHelper.testConnection(host, username, password
      , port, database);
    ret.then(function(result) {
        if (result.status === 'success') {
            sqlHelper.initializeTables(name,province + '_' + city +
              '_' + area, address).then(function(msg) {
                dao.createNewCommunity(host, username, password, port, database,
                    name, province + '_' + city + '_' + area, address)
                    .then(function() {
                        res.send(msg);
                    });
            });
        } else {
            res.send(result);
        }
    });

});
router.get('/manage/:id', function(req, res, next) {
    console.log('[manage detail]' + req.params.id);
    res.render('manage_detail', {
        title: '详细设置'
    });
});
router.get('/manage', function(req, res, next) {
    dao.getCommunities().then(function(result) {
        if (result.status === 'success') {
            console.log(util.inspect(result));
            res.render('manage', {
                title: '管理社区',
                communities: result.detail
            });
        } else {
            console.log(util.inspect(result));
            res.render('manage', {
                title: '管理社区',
                communities: []
            });
        }
    });
});
module.exports = router;
