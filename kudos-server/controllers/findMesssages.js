const { Message } = require('../models/Message');
const { validate } = require('../utilities/validate');
const Joi = require('joi');

module.exports = async (chatId) => {
    try {
        validate([chatId], [Joi.objectId()]);

        const messages = await Message.find({ chat: chatId }).select('-chat')
            .populate({
                path: 'sentBy',
                select: '_id'
            });
        if (!messages) throw new Error('Failed to retrieve messages');
        return {
            data: messages,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to retrieve messages'
        };
    }
}