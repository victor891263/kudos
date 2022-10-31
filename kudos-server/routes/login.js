const express = require('express');
const { User, validateSchema: schema } = require('../models/User');
const { validateREST: validate } = require('../utilities/validate');
const generateToken = require('../utilities/generateToken');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, password } = req.body;

    // Check if all fields are present and in the right format
    validate([name, password], [schema.name, schema.password], res.status(400));

    // Check if user with provided username exists
    const user = await User.findOne({ name });
    if (!user) {
        res.status(400);
        throw new Error('Specified user does not exist');
    }

    // check if the correct password is provided
    if (!user.matchPassword(password)) {
        res.status(400);
        throw new Error('Wrong password provided');
    }

    // Send jsonwebtoken to the client with the following properties
    const token = generateToken({
        _id: user._id,
        name: user.name,
        img: user.img,
        status: user.status
    });
    res.status(201).send(token);
})

module.exports = router;