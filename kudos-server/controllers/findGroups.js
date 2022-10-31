const { Chat } = require('../models/Chat');

module.exports = async () => {
    try {
        const groups = await Chat.find({ isGroup: true }).select('_id name img members');
        if (!groups) throw new Error('Failed to retrieve groups');
        return {
            data: groups,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to retrieve groups'
        };
    }
}