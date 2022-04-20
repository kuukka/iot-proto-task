const express = require('express');

const router = express.Router();

const heartbeatCtrl = require('../controllers/heartbeat.controller');
const authToken = require('../middleware/authToken');

router.get('/', heartbeatCtrl.findAllHeartbeats);

router.get('/:id', heartbeatCtrl.findOneHeartbeat);

router.post('/', [authToken.verifyToken], heartbeatCtrl.createHeartbeat);

router.put('/:id', [authToken.verifyToken], heartbeatCtrl.updateHeartbeat);

router.delete('/:id', [authToken.verifyToken], heartbeatCtrl.deleteHeartbeat);

module.exports = router;