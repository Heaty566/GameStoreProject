const express = require('express');
const user = require('../routes/user-model');
const auth = require('../routes/authetication');

module.exports = (app) => {
    app.use(express.json());
    app.use("/users",user);
    app.use("/login", auth);
};