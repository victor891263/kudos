const { Chat, chatValidateSchema: schema } = require('../models/Chat');
const { validate } = require('../utilities/validate');

module.exports = async (isGroup, name, members, description, img) => {
    try {
        validate([isGroup, name, members, description, img], [schema.isGroup, schema.name, schema.members, schema.description, schema.img]);

        const unseen = members.map(member => {
            return {
                member,
                count: 0
            };
        });

        const chat = await Chat.create({ isGroup, name, members, unseen, description, img });
        if (!chat) throw new Error('Failed to create new chat');
        return {
            data: chat,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to create new chat'
        };
    }
}