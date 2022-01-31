const  express = require('express');
const  app = express();
const cors = require('cors');
const  port = 6000;
const  axios = require('axios');

app.use(cors());
app.use(express.json());



app.listen(port, () => {
  console.log('App listening on port: ', port);
})
