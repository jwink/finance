


var $ = require('jquery-no-dom');

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
  	console.log(data.query.results);
  	// var totalDiv = 0;
  	// $.each(data.query.results.quote, function(idx, ele) {
   //    //console.log(ele.Dividends);
   //    totalDiv += parseFloat(ele.Dividends);
  	// });
  	// console.log(totalDiv);

  }
});


	

