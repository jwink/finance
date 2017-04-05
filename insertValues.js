
var $ = require('jquery-no-dom');
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('pxdb');

module.exports.insertValues = function(data) {
    db.serialize(function() {  
  
      var stmt = db.prepare("INSERT INTO hist_prices VALUES (?,?,?)");

      $.each(data.query.results.quote, function(idx, ele) {
          stmt.run(ele.Date, ele.Symbol, ele.Close);
      });

      stmt.finalize();  
  
    });  
    //db.close();  
}
  

