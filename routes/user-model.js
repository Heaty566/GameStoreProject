const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {validate, User} = require('../models/user-model');

router.post("/", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = new User(_.pick(req.body, ["name", "phone", "userName"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user = await user.save();
    res.send(_.pick(user, ["name", "phone", "user"]));
});

module.exports = router;