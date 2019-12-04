const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        minlength: 3,
        required: true
    }
});

const Genre = mongoose.model("genre", genreSchema);

validateGenre = (genre) => {
    const Schema = {
        name: Joi.string().max(50).min(3).required()
    }

    return Joi.validate(genre, Schema);
};

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
