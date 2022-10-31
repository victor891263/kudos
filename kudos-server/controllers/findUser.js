const { User } = require('../models/User');
const Joi = require('joi');
const { validate } = require('../utilities/validate');

module.exports = async (userId) => {
    try {
        validate([userId], [Joi.objectId()]);

        const user = await User.findById(userId).select('-password');
        if (!user) throw new Error('Failed to retrieve user');
        return {
            data: user,
            error: null
        };
    } catch (error) {
        return {
            data: null,
            error: error.message || 'Failed to retrieve user'
        };
    }
}