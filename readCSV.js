

var csvtojson = require('csvtojson');
var fs = require('fs');

var csvFile = './output2.csv';

var csvConverter = new csvtojson.Converter({});

csvConverter.on("end_parsed", function(jsonObj) {
  console.log(jsonObj);
});

fs.createReadStream(csvFile).pipe(csvConverter);

fs.createReadStream('./output.csv').pipe(csvConverter);
