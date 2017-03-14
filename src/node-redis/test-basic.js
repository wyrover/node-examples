var redis = require('redis');
client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

console.log("Setting key1");

client.set("key1", "My string!", redis.print);

console.log("Getting key1");

client.get("key1", function(err, reply) {
  console.log("Result for key1:");
  console.log(reply);
  client.end();
});