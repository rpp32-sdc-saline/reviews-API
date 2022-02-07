const pg = require('pg');
const fs = require('fs');
const csv = require('fast-csv');
const credentials = require('./credentials');

var config = {
  user: credentials.user,
  password: credentials.password,
  host: credentials.server,
  port: 5432,
  database: credentials.database,
  idleTimeoutMillis: 0,
}

const pool = new pg.Pool(config);

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
})

let csvStream = csv.parseFile('./reviews.csv')
// let csvStream = csv.parseFile('./review example.csv')
  .on('data', function(record) {
    csvStream.pause();
    // console.log('this is the record', record);
      let id = parseInt(record[0]);
      let product_id = parseInt(record[1]);
      let rating = parseInt(record[2]);
      let date = parseInt(record[3]);
      let summary = record[4];
      let body = record[5];
      let recommend = (record[6] === 'TRUE');
      let reported = (record[7] === 'TRUE');
      let reviewer_name = record[8];
      let reviewer_email = record[9];
      let response = record[10];
      let helpfulness = parseInt(record[11]);
      pool.query('INSERT INTO review(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) \
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness], function(err) {
        if (err) {
          console.log(err)
        }
      });
      console.log('now 2', id);
    csvStream.resume();
  }).on('end', function() {
    console.log('data insert completed');
  }).on('error', function(err) {
    // console.log(err);
  })

