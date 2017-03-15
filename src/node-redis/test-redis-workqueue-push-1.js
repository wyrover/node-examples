var redis = require("redis");
var fs = require("fs");
path = require('path');

var redisCli = redis.createClient({'return_buffers': true});

for (var i = 0; i < 100000; i++) {
  redisCli.lpush("key_key" + i, "data" + i);
  redisCli.publish("process", "key_key" + i);
}




