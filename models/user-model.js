const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    phone: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    userName: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    },
    password: {
        type: String,
        maxlength: 500,
        minlength: 3,
        required: true
    }
});

const User = mongoose.model("user", userSchema);

validateUser = (user) => {
    const Schema = {
        name: Joi.string().max(50).min(3).required(),
        phone: Joi.string().max(50).min(3).required(),
        userName: Joi.string().max(500).min(3).required(),
        password: Joi.string().max(50).min(3).required()
    }

    return Joi.validate(user, Schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
