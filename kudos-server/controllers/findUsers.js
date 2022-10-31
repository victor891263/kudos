const { User } = require('../models/User');

module.exports = async (currentUserId) => {
    try {
        const users = await User.find({ _id: { $ne: currentUserId } });
        if (!users) throw new Error('Failed to retrieve users');
        return {
            data: users,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to retrieve users'
        };
    }
}