

var request = require('request');

var endURLOptions = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

var baseURL = 'https://query.yahooapis.com/v1/public/yql?q=';
//var histPricesSection = 'select%20*%20from%20yahoo.finance.historicaldata%20where%20';

var histPricesSection = 'select * from yahoo.finance.historicaldata where ';
//var symbolInfo = 'symbol%20%3D%20%22^VIX%22%20and%20';

var currSymbol = '^VIX';
var currStartDate = '2017-03-01';
var currEnddate = '2018-01-01';

var symbolInfo = 'symbol = "' + currSymbol + '" and ';

//var startDate = 'startDate%20%3D%20%222016-11-30%22%20and%20';
var startDate = 'startDate = "' + currStartDate + '" and ';

var endDate = 'endDate = "' + currEnddate +  '"';


request(baseURL
        +escape(histPricesSection)
        +escape(symbolInfo)
        +escape(startDate)
        +escape(endDate)
        +endURLOptions, function(error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  var data = JSON.parse(body);
  console.log(data.query.results.quote);
});


