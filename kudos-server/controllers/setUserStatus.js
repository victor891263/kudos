const { User } = require('../models/User');

module.exports = async (userId, status) => {
    try {
        const response = await User.findByIdAndUpdate(userId, { status });
        if (!response) throw new Error("Failed to update user's status");
    } catch (error) {
        console.log(error.message || "Failed to update user's status");
    }
}