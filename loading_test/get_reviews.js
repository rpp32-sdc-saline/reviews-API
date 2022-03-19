import http from 'k6/http';
import {sleep, check} from 'k6';
export let options= {
  vus: 4000,
  duration: '30s',
};
var max = 1000011;
export default function () {
  var randomId = Math.floor(Math.random() * max);
  var url= `http://localhost:3000/reviews/?product_id=${randomId}`;

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.get(url, params);
  sleep(1);
}