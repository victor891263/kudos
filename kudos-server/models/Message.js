const mongoose = require('mongoose')
const Joi = require('joi')

const messageSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

// Validation schema
const msgValidateSchema = {
    body: Joi.string().min(1).max(100).required(),
    chat: Joi.objectId().required(),
    sentBy: Joi.objectId().required()
}

const Message = mongoose.model('Message', messageSchema)

module.exports = { Message, msgValidateSchema }