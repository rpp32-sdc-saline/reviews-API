const config = require('../db/db.js');
const redis = require("ioredis");

const client = new redis(6379, config.host);

module.exports = client;