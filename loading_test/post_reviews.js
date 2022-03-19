import http from 'k6/http';
import {sleep, check} from 'k6';
export let options= {
  vus: 4000,
  duration: '30s',
};

export default function () {
  var url= 'http://localhost:3000/reviews/?product_id=1003';
  var payload= JSON.stringify({
    "product_id":1003,
    "rating":5,
    "summary":"good",
    "body":"very gooooooooooooooooooooooooooooooooooooooooooooood",
    "recommend":true,
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
    "characteristics":{"3343":4,"3344":3,"3345":5,"3346":1}
  })

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  http.post(url, payload, params);
  sleep(1);
}