const pg = require('pg');
const fs = require('fs');
const csv = require('fast-csv');
const format = require('pg-format');
// const credentials = require('./credentials');
const config = require('./db.js')

const pool = new pg.Pool(config);

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
})
var count = 0;
var dataTemp = [];
let csvStream = csv.parseFile('../csv/reviews.csv')
  .on('data', function(record) {
    let id = parseInt(record[0]);
    let product_id = parseInt(record[1]);
    let rating = parseInt(record[2]);
    // let date = (isNaN(parseInt(record[3])) === false) ? new Date(parseInt(record[3])).toISOString() : record[3];
    let date = parseInt(record[3]);
    let summary = record[4];
    let body = record[5];
    let recommend = (record[6] === 'TRUE');
    let reported = (record[7] === 'TRUE');
    let reviewer_name = record[8];
    let reviewer_email = record[9];
    let response = (record[10] === 'null') ? null : record[10];
    let helpfulness = parseInt(record[11]);
    if (!isNaN(id)) {
      dataTemp.push([id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness]);
    }
    if (dataTemp.length === 100) {
      csvStream.pause();
      pool.query(format('INSERT INTO review(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES %L;', dataTemp), function(err, data) {
        if (err) {
          console.log(err)
        }
        count = count + 100;
          console.log('now 2', count);
      });

      dataTemp = [];
      csvStream.resume();
    }
  }).on('end', function() {
    pool.query(
      format('INSERT INTO review(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES %L;', dataTemp), function(err, data) {
        if (err) {
          console.log(err)
        }
        count = count + 100;
        console.log('now 2', count);
     });
    console.log('data insert completed');
  }).on('error', function(err) {
    // console.log(err);
  })