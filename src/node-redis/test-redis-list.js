var redis = require('redis');
client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

client.lpush("pendingusers", "user1");
client.lpush("pendingusers", "user2");
client.lpush("pendingusers", "user3");
client.lpush("pendingusers", "user4");

client.rpop("pendingusers", function(err, username) {
  if (!err) {
    console.log("Processing " + username);
  }
  client.end();
});