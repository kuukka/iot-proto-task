const express = require('express');

const router = express.Router();

const moistureCtrl = require('../controllers/moisture.controller');
const authToken = require('../middleware/authToken');

router.get('/', moistureCtrl.findAllMoistures);

router.get('/:id', moistureCtrl.findOneMoisture);

router.post('/', [authToken.verifyToken], moistureCtrl.createMoisture);

router.put('/:id', [authToken.verifyToken], moistureCtrl.updateMoisture);

router.delete('/:id', [authToken.verifyToken], moistureCtrl.deleteMoisture);

module.exports = router;