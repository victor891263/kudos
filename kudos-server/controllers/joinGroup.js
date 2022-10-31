const { Chat } = require('../models/Chat');
const { validate } = require('../utilities/validate');
const Joi = require('joi');

module.exports = async (chatId, userId) => {
    try {
        validate([chatId], [Joi.objectId()]);

        const newChat = await Chat.findByIdAndUpdate(chatId, {
            $push: { members: userId }
        });
        if (!newChat) throw new Error('Failed to join group');
        return {
            data: newChat,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to join group'
        };
    }
}