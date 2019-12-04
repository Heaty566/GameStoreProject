const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();

const port = process.env.port || 3000;
app.listen(port, () => {
    winston.info(`listening on port ${port}, and waiting for request`);
});