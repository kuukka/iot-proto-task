const mongoose = require('mongoose');

// Define schema
const readSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        required: true,
        trim: true
    },
    light: {
        type: String,        
        trim: true,
        default: ""
    },
    temperature: {
        type: String,        
        trim: true,
        default: ""
    },
    humidity: {
        type: String,        
        trim: true,
        default: ""
    },
    distance: {
        type: String,        
        trim: true,
        default: ""
    },
});

module.exports = mongoose.model('Reading', readSchema);