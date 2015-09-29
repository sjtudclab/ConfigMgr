var express = require('express');
var router = express.Router();
var metadataController = require('../controllers/metadataController');

/*PAGES*/
router.get('/', metadataController.index);

router.get('/entities/:id', metadataController.getEntities);

router.get('/relationship', metadataController.getRelationship);

/*API*/
router.post('/createEntity', metadataController.createEntity);

router.post('/updateEntity', metadataController.updateEntity);

router.post('/removeEntity', metadataController.removeEntity);

router.post('/createProperty', metadataController.createProperty);

router.post('/updateProperty', metadataController.updateProperty);

router.post('/removeProperty', metadataController.removeProperty);

router.post('/getEntities', metadataController.getEntityListForDisplay);

router.post('/getPropertiesByEntityId', metadataController.getPropertiesByEntityId);

router.post('/createRelationship', metadataController.createRelationship);

module.exports = router;
