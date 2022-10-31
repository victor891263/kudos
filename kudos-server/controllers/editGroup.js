const { Chat, chatValidateSchema: schema } = require('../models/Chat');
const { validate } = require('../utilities/validate');

module.exports = async (groupId, newData) => {
    try {
        validate([newData.description], [schema.description]);

        const response = await Chat.findByIdAndUpdate(groupId, newData);
        if (!response) throw new Error("Failed to update group");
        return {
            data: response,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || "Failed to update group"
        };
    }
}