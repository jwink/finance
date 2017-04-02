
var $ = require('jquery-no-dom');
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('pxdb');
var json2csv = require('json2csv');
var fs = require('fs');

var outPutJSON = {};

function cleanDB() {
    db.serialize(function() {  
        db.run("DROP TABLE IF EXISTS hist_prices_uniq");  
        db.run("CREATE TABLE IF NOT EXISTS hist_prices_uniq (date TEXT, symbol TEXT, price REAL)");  
    });  
}

function populateUniq(dayObj) {
    db.serialize(function() {  
  
      var stmt = db.prepare("INSERT INTO hist_prices_uniq VALUES (?,?,?)");

      $.each(dayObj, function(key, value) {
          $.each(value, function(key2, value2) {
              stmt.run(key, key2, value2);
          });   
      });

      stmt.finalize(selectValuesUniq);  
  
    });  
    db.close();
}

selectValues = function() {
    db.serialize(function() {  
  
      db.all("SELECT date, symbol, price FROM hist_prices", function(err, rows) {
            //console.log(rows.length);
            $.each(rows, function(idx, ele) {
                if (outPutJSON[ele.date] == undefined) {
                    outPutJSON[ele.date] = {};
                    outPutJSON[ele.date][ele.symbol] = ele.price;
                } else {
                    outPutJSON[ele.date][ele.symbol] = ele.price;
                }
            });
            populateUniq(outPutJSON);
        });  
    });  
}

selectValuesUniq = function() {
    db.serialize(function() {  
  
      db.all("SELECT date, symbol, price FROM hist_prices_uniq", function(err, rows) {
            console.log(rows);
            var fields = ['date', 'symbol', 'price'];
            var csv = json2csv({ data: rows, fields: fields, quotes: '' });
 
            fs.writeFile('output.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
      });  
    });  
}
   
cleanDB();  
selectValues();
