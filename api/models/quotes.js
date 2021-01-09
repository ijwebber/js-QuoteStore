const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: true,
    },

    source: {
        type: String,
        trim: true,
    },

    notes: {
        type: String,
        trim: true
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Quote', QuoteSchema)