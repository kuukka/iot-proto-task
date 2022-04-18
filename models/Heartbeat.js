const mongoose = require('mongoose');

// Define schema
const beatSchema = new mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    value: {
        type: String,
        default: false
    }
});

module.exports = mongoose.model('Heatbeat', beatSchema);