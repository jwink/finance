
var request = require('request');
var config = require('./config');
var insert = require('./insertValues');

module.exports.histCall =  function(currSymbol, currStartDate) {
    var baseURL = 'https://query.yahooapis.com/v1/public/yql?q=';
    var endURLOptions = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    var histPricesSection = 'select * from yahoo.finance.historicaldata where ';
    var symbolInfo = 'symbol = "' + currSymbol + '"';
    var startDate = ' and startDate = "' + currStartDate + '" and ';
    var endDate = 'endDate = "' + config.config.currEndDate +  '"';
    request(baseURL
        +escape(histPricesSection)
        +escape(symbolInfo)
        +escape(startDate)
        +escape(endDate)
        +endURLOptions, function(error, response, body) {
            //console.log('error:', error); // Print the error if one occurred 
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            var data = JSON.parse(body);
            console.log(data.query.results.quote);
            insert.insertValues(data);
        });
}
