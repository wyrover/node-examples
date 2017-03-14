var redis = require('redis');
client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

var user = {
  username: 'johndoe',
  firstname: 'John',
  lastname: 'Doe',
  email: 'john@johndoe.com',
  website: 'http://www.johndoe.com'
}

console.log("Setting user hash");

client.hmset("user", user);

client.hkeys("user", function(err, replies) {
  console.log("Results for user:");
  console.log(replies.length + " replies:");
  replies.forEach(function(reply, i) {
    console.log(i + ": " + reply);
  });
  client.end();
});