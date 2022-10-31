const { Chat } = require('../models/Chat');
const { validate } = require('../utilities/validate');
const Joi = require('joi');

module.exports = async function leaveGroup(chatId, userId) {
    try {
        validate([chatId], [Joi.objectId()]);

        const updatedChats = await Chat.findByIdAndUpdate(chatId, {
            $pull: { members: userId }
        });
        if (!updatedChats) throw new Error("Failed to leave the group");
        return {
            data: updatedChats,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || "Failed to leave the group"
        }
    }
}