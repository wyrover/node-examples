var redis = require('redis');
client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

console.log("Setting user hash");

client.hmset("user", "username", "johndoe", "firstname", "john", "lastname", "doe");

client.hkeys("user", function(err, replies) {
  console.log("Results for user:");
  console.log(replies.length + " replies:");
  replies.forEach(function(reply, i) {
    console.log(i + ": " + reply);
  });
  client.end();
});