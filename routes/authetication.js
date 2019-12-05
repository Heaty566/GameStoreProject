const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const config = require('config');
const router = express.Router();
const {User} = require("../models/user-model");

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne( _.pick(req.body, ["userName"]));
    if (!user) return res.status(400).send("Invalid username or password");

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send("Invalid username or password");

    const token = getToken(user);

    res.status(200).header("x-auth-token", token).send(user);
});


validate = (login) => {
    const schema = {
        userName: Joi.string().max(50).min(3).required(),
        password: Joi.string().max(500).min(3).required()
    };

    return Joi.validate(login, schema);
}

getToken = (value) => {
    const token = jwt.sign({_id: value._id, isAdmin: value.isAdmin}, config.get("myKey") );
    return token;
};


module.exports = router;

