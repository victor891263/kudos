const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 20,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 64,
        required: true
    },
    link: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 50
    },
    about: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    img: {
        type: String,
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    status: {
        type: String,
        enum: ["online", "offline"]
    }
}, {
    timestamps: true,
    methods: {
        matchPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
    }
})

// This function runs before a document is saved to a collection
userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

const User = mongoose.model('User', userSchema)

// VALIDATION SCHEMA
const validateSchema = {
    name: Joi.string().min(1).max(20).required(),
    password: Joi.string().min(1).max(64).required(),
    link: Joi.string().min(0).max(50),
    about: Joi.string().min(0).max(100),
    img: Joi.string().min(0).max(100),
}

module.exports = { User, validateSchema }