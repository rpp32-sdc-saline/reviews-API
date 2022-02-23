
const app = require('./app.js');
const ports = 3000;

var server = app.listen(ports, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;