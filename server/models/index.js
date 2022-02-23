const config = require('../db/db.js');
const pg = require('pg');
const format = require('pg-format');

const pool = new pg.Pool(config);

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
})

module.exports = {

  reviews: {
    get: function (productId, page, count, totalOffset, sort, callback) {
      console.log('what is the', productId, page, count, totalOffset, sort);
      pool.query(`SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos From review
      WHERE product_id = ${productId} ORDER BY ${sort} DESC LIMIT ${count} OFFSET ${totalOffset};`, function(err, data) {
        if (err) {
          callback(err)
        }
        // var date = new Date(parseInt(data.rows.date));
        let result = {};
        result['product'] = productId;
        result['page'] = page;
        result['count'] = count;
        result['results'] = data.rows;
        for (var i = 0; i < result.results.length; i++) {
          var ISODate = new Date(parseInt(result.results[i].date));
          result.results[i].date = ISODate;
        }
        callback(null, result);
      });
    },

    post: function (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness, photos, characteristics, callback) {
      console.log('id.......', product_id, '\n', rating, '\n',date, '\n',summary,'\n', body, '\n',recommend, '\n',reported, '\n',reviewer_name, '\n',reviewer_email, '\n',helpfulness, '\n',photos, '\n',characteristics)
      pool.query('INSERT INTO review(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness, photos) \
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING review_id',[product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness, photos], function(err, data) {
        if (err) {
          callback({
            status: '404',
            msg: 'Review Insert Database Fail',
            data: err
          })
          // console.log('what we need', err)
        }
        let reviewsId = data.rows[0].id;
        let datas = Object.entries(characteristics);
          for (let i = 0; i < datas.length; i++) {
            datas[i][0] = parseInt(datas[i][0]);
            datas[i].push(reviewsId);
          }
        pool.query(format('INSERT INTO characteristic(characteristic_id, values, review_id) VALUES %L', datas), (err, charData) => {
          callback(err, data);
        })
      });
    },
    
  },

  meta: {

    get: function (productId, callback) {
      pool.query(`select characteristic.characteristic_id, review.recommend, review.rating, characteristic.id, \
      characteristic.values, characteristic_value.name
      from review full outer join characteristic on characteristic.review_id = review.review_id \
      full outer join characteristic_value on characteristic_value.id = characteristic.characteristic_id \
      where review.product_id = ${productId} ORDER BY review.review_id ASC;`, function(err, data) {
        if (err) {
          callback(err)
        }
        let datas = data.rows;
        let ratings = {};
        let recommended = {};
        let characteristic = {};
        let result = {};

        for (let i = 0; i < datas.length; i++) {
          if (ratings[datas[i].rating] === undefined) {
            ratings[datas[i].rating] = 0;
          }
          if (recommended[datas[i].recommend] === undefined) {
            recommended[datas[i].recommend] = 0;
          }
          if (characteristic[datas[i].name] === undefined) {
            characteristic[datas[i].name] = {id: datas[i].characteristic_id, value: datas[i].values};
          } else {
            characteristic[datas[i].name].value += datas[i].values;
          }
            ratings[datas[i].rating] ++;
            recommended[datas[i].recommend] ++;
        }

        let length = datas.length / Object.keys(characteristic).length;

        for (let item in characteristic) {
          characteristic[item].value = (characteristic[item].value / length).toString();
          // console.log('this is the res', item);
        }
        for (let item in recommended) {
          // characteristic[item].value = (characteristic[item].value / length).toString();
          // console.log('this is the res', item);
          recommended[item] = recommended[item].toString();
        }
        for (let item in ratings) {
          ratings[item] = ratings[item].toString();
          console.log('this is the res', recommended[item]);
        }
        result.product_id = productId;
        result.ratings = ratings;
        result.recommended = recommended;
        result.characteristics = characteristic;
        callback(null, result);
      });
    },

  },

  helpful: {

    put: function (reviewId, callback) {
      pool.query(`UPDATE review SET helpfulness = helpfulness + 1 WHERE review_id = ($1);`, [reviewId], (err, data) => {
        callback(err, data);
      });
    },

  },

  report: {

    put: function (reviewId, callback) {
      pool.query(`UPDATE review SET reported = true WHERE review_id = ($1);`, [reviewId], (err, data) => {
        callback(err, data);
      });
    },
  },

};