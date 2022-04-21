const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    roomNr: {
        type: String,
        required: true,
        trim: true
    },
    deviceId: {
        type: String,    
        trim: true
    },
});

module.exports = mongoose.model('Patient', patientSchema);
