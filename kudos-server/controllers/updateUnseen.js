const { Chat } = require('../models/Chat');
const { validate } = require('../utilities/validate');
const Joi = require('joi');

module.exports = async (accountId, chatId) => {
    try {
        validate([accountId, chatId], [Joi.objectId(), Joi.objectId()]);

        let chat = await Chat.findById(chatId);
        if (!chat) throw new Error('Failed to update chat');

        let unseen = chat.unseen;
        let user = unseen.find(item => item.member.toString() === accountId);
        user.count = 0;

        let newChat = await Chat.findByIdAndUpdate(chatId, { unseen });
        if (!newChat) throw new Error('Failed to update chat');

        return {
            data: newChat,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to update chat'
        };
    }
}