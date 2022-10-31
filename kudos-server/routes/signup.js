const express = require('express')
const { User, validateSchema: schema } = require('../models/User')
const { validateREST: validate } = require('../utilities/validate')
const generateToken = require('../utilities/generateToken')

const router = express.Router()

router.post('/', async (req, res) => {
    const { name, password } = req.body

    // Check if all fields are present and in the right format
    validate([name, password], [schema.name, schema.password], res.status(400))

    // Check if provided username is already taken
    const account = await User.findOne({ name })
    if (account) {
        res.status(400)
        throw new Error('Given username is already taken')
    }

    // Add the user to the db and send token to client
    const user = await User.create({ name, password })
    if (user) {
        const token = generateToken({
            _id: user._id,
            name: user.name,
            img: user.img,
            status: user.status
        })
        res.status(201).send(token)
    } else {
        throw new Error('Failed to create the user')
    }
})

module.exports = router