const express = require('express');

const router = express.Router();

const luminanceCtrl = require('../controllers/luminance.controller');
const authToken = require('../middleware/authToken');

router.get('/', luminanceCtrl.findAllLuminances);

router.get('/:id', luminanceCtrl.findOneLuminance);

router.post('/', [authToken.verifyToken], luminanceCtrl.createLuminance);

router.put('/:id', [authToken.verifyToken], luminanceCtrl.updateLuminance);

router.delete('/:id', [authToken.verifyToken], luminanceCtrl.deleteLuminance);

module.exports = router;