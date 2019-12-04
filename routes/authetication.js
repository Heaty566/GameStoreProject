const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User} = require("../models/user-model");

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.find( _.pick(req.body, ["userName"]));
    if (!user) return res.status(400).send("Invalid username or password");
    console.log(user);
    console.log(req.body);
    const validatePassword = bcrypt.compare(req.body.password, user.password);
    if (!validatePassword) return res.status(400).send("Invalid username or password");

    res.send(user);
});


validate = (login) => {
    const schema = {
        userName: Joi.string().max(50).min(3).required(),
        password: Joi.string().max(500).min(3).required()
    };

    return Joi.validate(login, schema);
}


module.exports = router;

