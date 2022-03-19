const  express = require('express');
const  app = express();
const  cors = require('cors');
const bodyParser = require('body-parser');
const models = require('../server/models/index')
const client = require('../server/redis/redis.js')
const loader = require('./loaderio-44307f0a71130520529d97c318199a0a.txt')

client.on('connect', function() {
  console.log('connect to redis');
})
client.on('error', err => {
    console.log('Error ' + err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/loaderio-44307f0a71130520529d97c318199a0a/', (req, res) => {
  res.send(loader);
})

app.get('/reviews', async function (req, res) {
  try {
    const productId = req.query.product_id;
    let sort;
    let page = (req.query.page === undefined) ? 0 : req.query.page;
    let count = (req.query.count === undefined) ? 5 :  req.query.count;
    let totalOffset = page * count;
    if (req.query.sort === 'relevant') {
      sort = 'date DESC, helpfulness';
    } else {
      sort = (req.query.sort === 'helpful') ? 'helpfulness' : 'date';
    }
    client.get(productId, (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      };
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        models.reviews.get(productId, page, count, totalOffset, sort, (err, data) => {
          if (err) {
            res.status(404).send(err.message);
          } else {
            client.setex(productId, 3600, JSON.stringify(data));
            res.json(data);
          }
        })
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
})


app.get('/reviews/meta', async function (req, res) {
  try {
    const productId = req.query.product_id;
    const meta = productId + 'meta';
    client.get(meta, (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      };
      if (data !== null) {
        res.json(JSON.parse(data));
      } else {
        models.meta.get(productId, (err, data) => {
          if (err) {
            res.status(404).send(err.message);
          } else {
            client.setex(meta, 3600, JSON.stringify(data));
            res.json(data);
          }
        })
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
})

app.post('/reviews', async function (req, res) {
  try {
    const product_id = req.body.product_id;
    let rating = req.body.rating;
    let tzoffset = new Date();
    var date = tzoffset.getTime();
    let summary = req.body.summary;
    let body = req.body.body;
    let recommend = req.body.recommend;
    let reported = false;
    let reviewer_name = req.body.name;
    let reviewer_email = req.body.email;
    let helpfulness = 0;
    let photos = JSON.stringify(req.body.photos);
    let characteristics = req.body.characteristics;
    let result = [];
    models.reviews.post(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness, photos, characteristics,
    (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.sendStatus(201);
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
})

app.put('/reviews/:review_id/helpful', async function (req, res) {
  try {
    const reviewId = req.params.review_id;
    models.helpful.put(reviewId, (err, data) => {
      if (err) {
        res.status(404).send(err.message);
      } else {
        res.sendStatus(201);
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
})

app.put('/reviews/:review_id/report', async function (req, res) {
  try {
    const reviewId = req.params.review_id;
    models.report.put(reviewId, (err, data) => {
      if (err) {
        res.status(404).send(err.message);;
      } else {
        res.sendStatus(201);
      }
    })
  } catch (err) {
    res.status(400).send(err.message);
  }
})

module.exports = app;
