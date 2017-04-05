
var $ = require('jquery-no-dom');
var insert = require('./insertValues');



var testURLTres = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22VZ%22%20and%20startDate%20%3D%20%222016-11-30%22%20and%20endDate%20%3D%20%222017-03-20%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='


$.ajax({
  type: "GET",
  url: testURLTres,
  dataType: "json",
  success: function(data) {
      insert.insertValues(data);
  }
});  
