const { Message, msgValidateSchema: schema } = require('../models/Message');
const { Chat } = require('../models/Chat');
const { validate } = require('../utilities/validate');

module.exports = async (body, sentBy, chatId) => {
    try {
        validate([body, sentBy, chatId], [schema.body, schema.sentBy, schema.chat]);

        const createdMessage = await Message.create({body, sentBy, chat: chatId});
        const populatedWithChat = await createdMessage.populate({
            path: 'chat',
            select: '_id'
        });
        const populatedWithLastMsg = await populatedWithChat.populate({
            path: 'sentBy',
            select: '_id'
        });
        if (!populatedWithLastMsg) throw new Error('Failed to send message');

        let associatedChat = await Chat.findById(chatId);
        // Increment the number of messages other users (users other than the sender of this message) haven't seen
        let { unseen, lastMsg } = associatedChat;
        unseen.forEach(item => {
            if (item.member.toString() !== sentBy) item.count++;
        });
        lastMsg = populatedWithLastMsg.id;

        const updatedChat = await Chat.findByIdAndUpdate(associatedChat._id, { unseen, lastMsg });
        if (!updatedChat) throw new Error('Failed to send message');

        return {
            data: populatedWithLastMsg,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to send message'
        };
    }
}