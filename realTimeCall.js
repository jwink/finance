

var request = require('request');

function realTimeCall(currSymbol) {
    var baseURL = 'https://query.yahooapis.com/v1/public/yql?q=';
    var realTimePx = 'select * from yahoo.finance.quotes where ';
    var endURLOptions = '&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';
    var symbolInfo = 'symbol = "' + unescape(currSymbol) + '"';
    request(baseURL
        +escape(realTimePx)
        +escape(symbolInfo)
        +endURLOptions, function(error, response, body) {
            var data = JSON.parse(body);
            console.log(unescape(currSymbol), data.query.results.quote.LastTradePriceOnly);
            console.log(unescape(currSymbol), data.query.results.quote);
        });
}

realTimeCall('GRPN');
realTimeCall('AAPL');
realTimeCall('MSFT');
realTimeCall('PFE');
realTimeCall('%5eGSPC');
realTimeCall('TWO');
realTimeCall('%5eTNX');
realTimeCall('%5eTYX');
realTimeCall('IVR');
realTimeCall('VZ');
realTimeCall('%5eFVX');
realTimeCall('MTGE');

