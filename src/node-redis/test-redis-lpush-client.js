var redis = require('redis'),
  client = redis.createClient();

client.on('error', function(err) {
  console.log('Error: ' + err);
});

for (var i = 1; i < 5; i++) {
  client.lpush('pendingusers', 'user' + i);
}
client.rpop('pendingusers', function(err, username) {
  if (!err) {
    console.log('Processing ' + username);
  }
  client.end();
});