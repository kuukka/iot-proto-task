const Patient = require('../models/Patient');

exports.findAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong retieving the tasks"
        })
    }
};

exports.createPatient = async (req, res) => {
    try {        
        const newPatient = new Patient({            
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roomNr: req.body.roomNr,
            deviceId: req.body.deviceId,    
        });
        const patientSaved = await newPatient.save();
        res.json(patientSaved)
    } catch (error) {
        res.status(500).json({
            message: error.message || "Something goes wrong creating a patient"
        })
    }
};

exports.findOnePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id)
        if(!patient) return res.status(404).json({
            message: `Patient with id ${id} does not exists!`
        });
        res.json(patient)
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error retrieving patient with id: ${id}`
        })
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Patient.findByIdAndDelete(id)
        res.json({
            message: `${id} - Patient were deleted successfully!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Cannot delete patient with id ${id}`
        })
    }
}

exports.updatePatient = async (req, res) => {
    const {id} = req.params;
    try {
        await Patient.findByIdAndUpdate(id, req.body)
    res.json({
        message: "Patient was updated successfully"
    })
    } catch (error) {
        res.status(500).json({
            message: `Cannot update patient with id: ${id}`
        })
    }
}