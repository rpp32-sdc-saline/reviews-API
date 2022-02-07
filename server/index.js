const  express = require('express');
const  app = express();
const cors = require('cors');
// const  port = 6000;

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(6000, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;