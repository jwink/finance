

var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('pxdb');

db.serialize(function() {  
  db.run("CREATE TABLE IF NOT EXISTS hist_prices (date TEXT, symbol TEXT, price REAL)");  
});  
  
db.close();  
  

