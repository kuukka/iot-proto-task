const express = require('express');

const router = express.Router();

const deviceCtrl = require('../controllers/device.controller');
const authToken = require('../middleware/authToken');

router.get('/', deviceCtrl.findAllDevices);

router.get('/:id', deviceCtrl.findOneDevice);

router.post('/', [authToken.verifyToken], deviceCtrl.createDevice);

router.put('/:id', [authToken.verifyToken], deviceCtrl.updateDevice);

router.delete('/:id', [authToken.verifyToken], deviceCtrl.deleteDevice);

module.exports = router;