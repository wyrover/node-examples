var redis = require('redis');
client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

client.sadd("myteam", "Neil");
client.sadd("myteam", "Peter");
client.sadd("myteam", "Brian");
client.sadd("myteam", "Scott");
client.sadd("myteam", "Brian");

client.smembers("myteam", function(err, members) {
  console.log(members);
  client.end();
});