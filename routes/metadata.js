var express = require('express');
var router = express.Router();
var metadataController = require('../controllers/metadataController');

router.get('/newEntity', metadataController.getEntities);

router.post('/createEntity', metadataController.createEntity);
module.exports = router;
