const mongoose = require('mongoose');

// Define schema
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookSchema);