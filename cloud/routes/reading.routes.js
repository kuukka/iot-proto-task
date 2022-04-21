const express = require('express');

const router = express.Router();

const readingCtrl = require('../controllers/reading.controller');
const authToken = require('../middleware/authToken');

router.get('/', readingCtrl.findAllReadings);

router.get('/:id', readingCtrl.findOneReading);

router.post('/', [authToken.verifyToken], readingCtrl.createReading);

router.put('/:id', [authToken.verifyToken], readingCtrl.updateReading);

router.delete('/:id', [authToken.verifyToken], readingCtrl.deleteReading);

module.exports = router;