const express = require('express')
const Joi = require('joi')
const { Chat } = require('../models/Chat')
const { validateREST: validate } = require('../utilities/validate')

const router = express.Router()

router.get('/', async (req, res) => {
    const accountId = req.user._id

    // Check if all fields are present and in the right format
    validate([accountId], [Joi.objectId()], res.status(400))

    const chats = await Chat.find({ members: accountId })
    if (!chats) {
        res.status(500)
        throw new Error('Failed to retrieve chats')
    }
    return chats
})

module.exports = router