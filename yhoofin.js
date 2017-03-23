


var $ = require('jquery-no-dom');


var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('abcd');  

function main() {  
// db.serialize(function() {  
//   //db.run("CREATE TABLE user (id INT, dt TEXT)");  
  
//   var stmt = db.prepare("INSERT INTO user VALUES (?,?)");  
//   for (var i = 10; i < 20; i++) {  
    
//       var d = new Date();  
//       var n = d.toLocaleTimeString();  
//       stmt.run(i, n);  
//   }  
//   stmt.finalize();  
  
//   db.each("SELECT id, dt FROM user", function(err, row) {  
//       console.log("User id : "+row.id, row.dt);  
//   });  
// });  
  
// db.close();  

// return 0

var baseURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from';


//var indirectURL = '%20yahoo.finance.historicaldata';
var indirectURL = '%20yahoo.finance.dividendhistory';
var indirectURLDos = '%20yahoo.finance.historicaldata';
var whereClause = '%20where%20symbol%20in%20%28%27MTGE%27%29%20';
var params = ['and%20startDate%20=%20%272000-05-01%27%20',
              'and%20endDate%20=%20%272016-07-28%27',
              '&diagnostics=true',
              '&env=store://datatables.org/alltableswithkeys',
              '&format=json'
             ];



var fullURL = '';

fullURL = fullURL + baseURL + indirectURLDos + whereClause;

$.each(params, function(idx, ele) {
  fullURL = fullURL + ele;
});


var testURLDos = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22YHOO%22%20and%20startDate%20%3D%20%222009-09-11%22%20and%20endDate%20%3D%20%222010-03-10%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

var testURLTres = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22^VIX%22%20and%20startDate%20%3D%20%222016-11-30%22%20and%20endDate%20%3D%20%222018-02-01%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='


//var testURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20%2a%20from%20yahoo.finance.historicaldata%20where%20symbol%20in%20%28%27YHOO%27%29%20and%20startDate%20=%20%272009-09-11%27%20and%20endDate%20=%20%272010-03-10%27&diagnostics=true&env=store://datatables.org/alltableswithkeys&format=json';


$.ajax({
  type: "GET",
  url: testURLTres,
  dataType: "json",
  success: function(data) {
  	//console.log(data.query.results.quote);
    db.serialize(function() {  
      db.run("CREATE TABLE prices (id INT, dt TEXT, symbol TEXT, close TEXT)");  
  
      var stmt = db.prepare("INSERT INTO prices VALUES (?,?,?,?)");

      $.each(data.query.results.quote, function(idx, ele) {
          stmt.run(idx, ele.Date, ele.Symbol, ele.Close);
      });

      stmt.finalize();  
  
      db.each("SELECT id, dt, symbol, close FROM prices", function(err, row) {  
          console.log("Prices : "+row.id, row.dt, row.symbol, row.close);  
      });  
    });  
    db.close();  
  }
});

}

main();

	

