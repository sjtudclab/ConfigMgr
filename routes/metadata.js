var express = require('express');
var router = express.Router();
var metadataController = require('../controllers/metadataController');

router.get('/', function(req, res, next) {
    console.log('Visiting meta router, with path ' + req.path);
    var communityId = req.query.id;
    if (id) {
        
    }else {
        res.redirect('/');
    }
});
router.get('/newEntity', metadataController.getEntities);

router.post('/createEntity', metadataController.createEntity);

router.post('/createProperty', metadataController.createProperty);
module.exports = router;
