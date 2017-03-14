//var argv = require('optimist')
//  .string('author')
//  .argv;
var mysql = require('mysql');
var connection = mysql.createConnection({
  user: 'root',
  password: 'xiaotian',
  //debug: true

});

connection.changeUser({
  database: 'quotes'
}); // connection.query('USE quotes');

var params = {
  author: process.argv[2]
};

if (params.author) {
  
  connection.query('SELECT *  FROM quotes WHERE ' +
      'author LIKE ' + connection.escape(params.author))
    .on('result', function(rec) {
      console.log('%s: %s \n', rec.author, rec.quote);
    });
}
connection.end();