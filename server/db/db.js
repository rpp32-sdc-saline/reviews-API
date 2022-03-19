const credentials = require('./credentials');

var config = {
  user: credentials.user,
  password: credentials.password,
  host: credentials.server,
  port: 5432,
  database: credentials.database,
  // idleTimeoutMillis: 0,
}

module.exports = config;