const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews')
  .then(() => console.log('db connect'))
  .catch(err => console.log(err, 'not connect'))

const product = new mongoose.Schema({
  product_id: Number,
  page: Number,
  count: Number,
  review： {
    review_id: Number,
    rating: Number,
    summary: String,
    recommend: BOOLEAN,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: BOOLEAN,
    photo: [
      {
        id: Number,
        url: String,
      }
    ]
  }
});

