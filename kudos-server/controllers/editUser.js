const { User, validateSchema: schema } = require('../models/User');
const { validate } = require('../utilities/validate');

module.exports = async (userId, newData) => {
    const { link, about } = newData;
    try {
        validate([link, about], [schema.link, schema.about]);

        const response = await User.findByIdAndUpdate(userId, newData);
        if (!response) throw new Error("Failed to update user profile");
        return {
            data: response,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || "Failed to update user profile"
        };
    }
}