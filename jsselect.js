
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('abcd');  
var spawn = require('child_process').spawn;

var python_file = "c:/Users/jwinkler/scripts/finance/pyselect.py";
var params = [python_file];
var process = spawn('python', params);
var stdout = '';

process.stdout.on('data', function(data) {
    stdout += data.toString();
    console.log(stdout);
});



process.on('close', function(exitCode) {
    //console.log(stdout);
    console.log('done', exitCode);
});

// db.serialize(function() {    
//     db.each("SELECT id, dt, symbol, close FROM prices", function(err, row) {  
//         console.log("From JS: "+row.id, row.dt, row.symbol, row.close);  
//     });  
// });  
// db.close();  
  


