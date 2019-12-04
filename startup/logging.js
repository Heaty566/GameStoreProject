const config = require('config');
const winston = require('winston');
require('winston-mongodb');

module.exports = () => {
    winston.add( new (winston.transports.File)({filename: "logging.log"}));
    winston.add( new (winston.transports.MongoDB)({db: config.get("db")}));
};