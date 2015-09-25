var express = require('express');
var util = require('util');
var router = express.Router();
var sqlHelper = require('../service/sqlHelper');
var metadataController = require('../controllers/metadataController');

var metadata = require('./metadata');

router.get('/', function(req, res, next) {
    res.redirect('/meta');
});
router.use('/meta',metadata);

module.exports = function(app) {
    app.use('/', router);
};
