const pg = require('pg');
const fs = require('fs');
const csv = require('fast-csv');
const format = require('pg-format');
const config = require('./db.js')

const pool = new pg.Pool(config);

pool.connect(function(err) {
  if (err) {
    console.log(err);
  }
})

let characteristictemp = [];
var dataTemp = [];
let charCount = 0;
let nameCount = 0;
let count = 0;

let characteristics = csv.parseFile('../csv/characteristic_reviews.csv')
  .on('data', function(record) {
    let id = parseInt(record[0]);
    let characteristic_id = parseInt(record[1]);
    let review_id = parseInt(record[2]);
    let values = parseInt(record[3]);
    if (!isNaN(id)) {
      dataTemp.push([id, characteristic_id, review_id, values]);
    }
    if (dataTemp.length === 45) {
      characteristics.pause();

      pool.query(format('INSERT INTO characteristic(id, characteristic_id, review_id, values) \
      VALUES %L;', dataTemp), function(err) {
        if (err) {
          console.log(err)
        }
        count = count + 45;
          console.log('now 2', count);
      });
      dataTemp = [];
      characteristics.resume();
    }
  }).on('end', function() {

    pool.query(format('INSERT INTO characteristic(id, characteristic_id, review_id, values) \
    VALUES %L;', dataTemp), function(err) {
      if (err) {
        console.log(err)
      }
      count = count + 100;
        console.log('now 2', count);
    });
    console.log('data insert completed');
  }).on('error', function(err) {
    console.log(err);
  })
// let charNametemp = []



// var countValue = 0;
// var dataValueTemp = [];

// let characteristics_value = csv.parseFile('../csv/characteristics.csv')
//   .on('data', function(record) {
//     let id = parseInt(record[0]);
//     let productId = parseInt(record[1]);
//     let name = record[2];
//     if (!isNaN(id)) {
//       dataValueTemp.push([id, productId, name]);
//     }
//     if (dataValueTemp.length === 100) {
//       characteristics_value.pause();
//       pool.query(format('INSERT INTO characteristic_value(id, product_id, name) VALUES %L;', dataValueTemp), function(err, data) {
//         if (err) {
//           console.log(err)
//         }
//         countValue = countValue + 100;
//         console.log('now 2', countValue);
//       });
//       dataValueTemp = [];
//       characteristics_value.resume();
//     }
//   }).on('end', function() {
//     pool.query(format('INSERT INTO characteristic_value(id, product_id, name) VALUES %L;', dataValueTemp), function(err, data) {
//       if (err) {
//         console.log(err)
//       }
//       countValue = countValue + 1;
//       console.log('now 2', countValue);
//     });
//     console.log('data insert completed');
//   }).on('error', function(err) {
//     console.log(err);
//   })