const express = require('express');

const router = express.Router();

const patientCtrl = require('../controllers/patient.controller');
const authToken = require('../middleware/authToken');

router.get('/', patientCtrl.findAllPatients);

router.get('/:id', patientCtrl.findOnePatient);

router.post('/', [authToken.verifyToken], patientCtrl.createPatient);

router.put('/:id', [authToken.verifyToken], patientCtrl.updatePatient);

router.delete('/:id', [authToken.verifyToken], patientCtrl.deletePatient);

module.exports = router;