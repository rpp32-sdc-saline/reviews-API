import http from 'k6/http';
import {sleep, check} from 'k6';
export let options= {
  vus: 4000,
  duration: '30s',
};
var max = 5774982;
export default function () {
  var randomId = Math.floor(Math.random() * max);
  var url= `http://localhost:3000/reviews/${randomId}/helpful`;
  const res = http.put(url);
  sleep(1);
}