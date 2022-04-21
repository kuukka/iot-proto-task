const mongoose = require('mongoose');


const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    deviceId: {
        type: String,
        required: true,
        trim: true
    },
    sensorLuminance: {
        type: Boolean,
        required: true        
    },
    sensorTemperature: {
        type: Boolean,
        required: true        
    },
    sensorMoisture: {
        type: Boolean,
        required: true        
    },
    sensorHeartbeat: {
        type: Boolean,
        required: true        
    }
});

module.exports = mongoose.model('Device', deviceSchema);
