const pg = require('pg');
const fs = require('fs');
const csv = require('fast-csv');
const credentials = require('./credentials');

let phototemp = [];
let count = 0;
let temp = 0;
let idTemp = [];

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


var transform = function(array) {
  var transform = [];
  for (var i = 0; i < array.length; i++) {
    transform.push({id: i + 1, url: array[i]});
  }
  return transform;
};

let photos = csv.parseFile('../csv/reviews_photos.csv')
  .on('data', function(record) {
    photos.pause();
    // var id = record[1];
    let id_photo = parseInt(record[0]);
    if (record[1] !== temp ) {
      let id = idTemp.pop();
      idTemp.push(record[1]);
      let url = JSON.stringify(transform (phototemp));
      if (phototemp.length !== 0) {
        pool.query(`UPDATE review SET photos = ($1) WHERE id = ($2);`, [url, id], (err) => {
          if (err) {
            console.log(err)
          }
          count ++;
          console.log('now', count);
        });
      }
      temp = record[1];
      phototemp = [];
    }
    if (record[2] !== 'url') {
      phototemp.push(record[2]);
    }
    photos.resume();
  }).on('end', function() {
    let lastURL = JSON.stringify(transform (phototemp));
    pool.query(`UPDATE review SET photos = ($1) WHERE id = ($2);`, [lastURL, idTemp[0]], (err) => {
      if (err) {
        console.log(err)
      }
    });
    console.log('data insert completed');
  }).on('error', function(err) {
    console.log(err);
  })