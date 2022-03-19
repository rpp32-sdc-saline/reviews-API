const request = require('supertest');
const app = require('../app.js');
describe('loading express', function () {

  it('responds to get /reviews', function testSlash(done) {
  request(app)
    .get('/reviews?product_id=2')
    .expect(200, done);
  });

  it('responds to get /reviews/meta', function testSlash(done) {
    request(app)
      .get('/reviews/meta?product_id=2')
      .expect(200, done);
  });

  it('responds with a status code of 201 when send a put request to /reviews/:review_id/helpful', function testSlash(done) {
    request(app)
    .put('/reviews/2/helpful')
    .expect(201)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
  })

  it('404 of invalid review_id to /reviews/:review_id/helpful', function testPath(done) {
    request(app)
    .put('/reviews/20000000000000000/helpful')
    .expect(404, done);
  });

  it('responds with a status code of 201 when send a put request to /reviews/:review_id/report', function testSlash(done) {
    request(app)
    .put('/reviews/2/report')
    .expect(201)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
  })

  it('404 of invalid review_id to /reviews/:review_id/report', function testPath(done) {
    request(app)
    .put('/reviews/20000000000000000/report')
    .expect(404, done);
  });

  it('responds to post /reviews', function testSlash(done) {
    request(app)
    .post('/reviews')
    .send({
    "product_id":3,
    "rating":4,
    "summary":"good",
    "body":"very gooooooooooooooooooooooooooooooooooooooooooooood",
    "recommend":false,
    "name":"jack",
    "email":"jack@gmail.com",
    "photos":[{
             "id": 1,
             "url": "urlplaceholder/review_5_photo_number_1.jpg"
           },
           {
             "id": 2,
             "url": "urlplaceholder/review_5_photo_number_2.jpg"
           }
         ],
    "characteristics":{"6":4,"7":3,"8":5,"9":1}})
    .expect(201)
    .end(function(err, res){
      if (err) done(err);
      done();
    });
  });

  it('404 everything else', function testPath(done) {
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });

});