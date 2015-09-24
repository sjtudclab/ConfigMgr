var express = require('express');
var util = require('util');
var router = express.Router();
var sqlHelper = require('../service/sqlHelper');
var dao = require('../service/dao');
var metadataController = require('../controllers/metadataController');

var metadata = require('./metadata');

// router.use(function(req, res, next) {
        // console.log('req-pathL：' + req.path);
        // console.log('req-method:' + req.method);
        // console.log('user' + req.cookies.user);
        // if (!req.cookies.user && (req.path != '/login' && req.method != 'POST')) {
        //     console.log('redirecting to ->/login');
        //     res.redirect('/login');
        // } else {
        //     next();
        // }
    // });
    /* GET home page. */
router.get('/', metadataController.index);

// router.get('/new', function(req, res, next) {
//     var user = req.cookies.user;
//     res.render('new-community',
//         {title: '新建社区',
//         user: user});
// });

// router.post('/new', function(req, res, next) {
//     var host = req.body.host;
//     var username = req.body.username;
//     var password = req.body.password;
//     var port = req.body.port;
//     var database = req.body.database;

//     var province = req.body.province;
//     var city = req.body.city;
//     var area = req.body.area;
//     var address = req.body.address;

//     var name = req.body.communityName;
//     console.log('[name]' + name);

//     var ret = sqlHelper.testConnection(host, username, password
//       , port, database);
//     ret.then(function(result) {
//         if (result.status === 'success') {
//             sqlHelper.initializeTables(name,province + '_' + city +
//               '_' + area, address).then(function(msg) {
//                 dao.createNewCommunity(host, username, password, port, database,
//                     name, province + '_' + city + '_' + area, address)
//                     .then(function() {
//                         res.send(msg);
//                     });
//             });
//         } else {
//             res.send(result);
//         }
//     });

// });
// router.get('/manage/:id', function(req, res, next) {
//     console.log('[manage detail]' + req.params.id);
//     res.render('manage_detail', {
//         title: '详细设置'
//     });
// });
// router.get('/manage', function(req, res, next) {
//     dao.getCommunities().then(function(result) {
//         if (result.status === 'success') {
//             console.log(util.inspect(result));
//             res.render('manage', {
//                 title: '管理社区',
//                 communities: result.detail
//             });
//         } else {
//             console.log(util.inspect(result));
//             res.render('manage', {
//                 title: '管理社区',
//                 communities: []
//             });
//         }
//     });
// });

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    res.cookie('user',{name: 'Wu Yongfeng'});
    console.log('login: redireting to /');
    res.redirect(200, '/');
});

router.use('/meta',metadata);

module.exports = function(app) {
    app.use('/', router);
};
