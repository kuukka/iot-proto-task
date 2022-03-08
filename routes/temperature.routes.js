const express = require('express');

const router = express.Router();

const temperatureCtrl = require('../controllers/temperature.controller');
const authToken = require('../middleware/authToken');

router.get('/', temperatureCtrl.findAllTemperatures);

router.get('/:id', temperatureCtrl.findOneTemperature);

router.post('/', [authToken.verifyToken], temperatureCtrl.createTemperature);

router.put('/:id', [authToken.verifyToken], temperatureCtrl.updateTemperature);

router.delete('/:id', [authToken.verifyToken], temperatureCtrl.deleteTemperature);

module.exports = router;