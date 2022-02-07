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

let characteristictemp = [];

let characteristics = csv.parseFile('./characteristic_reviews.csv')
  .on('data', function(record) {
       characteristics.pause();
    let id = parseInt(record[0]);
    let characteristic_id = parseInt(record[1]);
    let review_id = parseInt(record[2]);
    let values = parseInt(record[3]);
    pool.query('INSERT INTO characteristic(id, characteristic_id, review_id, values) \
    VALUES($1, $2, $3, $4)', [id, characteristic_id, review_id, values], function(err) {
      if (err) {
        console.log(err)
      }
    });
    characteristics.resume();
  }).on('end', function() {
    console.log('data insert completed');
  }).on('error', function(err) {
    console.log(err);
  })


let characteristics_name = csv.parseFile('./characteristics.csv')
  .on('data', function(name) {
    characteristics_name.pause()
    let char_id = parseInt(name[0]);
    let char_name = name[2];
    console.log('char', char_id, 'and', char_name);
    pool.query(`UPDATE characteristic SET name = ($1) WHERE characteristic_id = ($2);`, [char_name, char_id], (err) => {
      if (err) {
        console.log(err)
      }
    });
    characteristics_name.resume();
  }).on('end', function() {
    console.log('data insert completed');
  }).on('error', function(err) {
    console.log(err);
  })
