const express = require('express');

const router = express.Router();

const heartbeatCtrl = require('../controllers/heartbeat.controller');
const authToken = require('../middleware/authToken');

router.get('/', heartbeatCtrl.findAllHearbeats);

router.get('/:id', heartbeatCtrl.findOneHearbeat);

router.post('/', [authToken.verifyToken], heartbeatCtrl.createHearbeat);

router.put('/:id', [authToken.verifyToken], heartbeatCtrl.updateHearbeat);

router.delete('/:id', [authToken.verifyToken], heartbeatCtrl.deleteHearbeat);

module.exports = router;