//var argv = require('optimist')
//  .string('author', 'quote')
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
  author: process.argv[2],
  quote: process.argv[3]
};

if (params.author && params.quote) {
  connection.query('INSERT INTO quotes.quotes (' +
    'author, quote) ' +
    'VALUES (?, ?);', [params.author, params.quote]);

}
connection.end();