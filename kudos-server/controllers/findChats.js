const { Chat } = require('../models/Chat');
const { validate } = require('../utilities/validate');
const Joi = require('joi');
const sortByLatestMsg = require('../utilities/sortByLatestMsg');

module.exports = async (accountId) => {
    try {
        validate([accountId], [Joi.objectId()]);

        const chats = await Chat.find({ members: accountId })
            .populate({
                path: 'members',
                select: '_id name img status updatedAt'
            })
            .populate({
                path: 'unseen.member',
                select: '_id'
            })
            .populate({
                path: 'lastMsg',
                select: '-chat',
                populate: {
                    path: 'sentBy',
                    select: '_id'
                }
            })
        if (!chats) throw new Error('Failed to retrieve chats');

        sortByLatestMsg(chats);

        return {
            data: chats,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to retrieve chats'
        };
    }
}