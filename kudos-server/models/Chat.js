const mongoose = require('mongoose')
const Joi = require('joi')

const chatSchema = new mongoose.Schema({
    isGroup: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    unseen: [{
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],
    description: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    img: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    lastMsg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }
}, { timestamps: true })

// Validation schema
const chatValidateSchema = {
    isGroup: Joi.boolean(),
    name: Joi.string().min(0).max(30),
    members: Joi.array().items(Joi.objectId()),
    unseen: Joi.array().items({
        member: Joi.objectId().required(),
        count: Joi.number().required()
    }),
    description: Joi.string().min(0).max(100),
    img: Joi.string().min(0).max(100),
    lastMsg: Joi.objectId()
}

const Chat = mongoose.model('Chat', chatSchema)

module.exports = { Chat, chatValidateSchema }