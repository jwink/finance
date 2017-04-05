
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('pxdb');
var $ = require('jquery-no-dom');
var histCall = require('./histAPICall');
var config = require('./config');

function addZero(monthOrDay) {
    if (monthOrDay < 10) {
        return '0' + monthOrDay;
    } else {
        return monthOrDay;
    }
}


function buildString(startDate) {
      var strStartDate = '';
      strStartDate += startDate.getUTCFullYear().toString();
      strStartDate += '-';
      strStartDate += addZero(startDate.getUTCMonth()+1);
      strStartDate += '-';
      strStartDate += addZero(startDate.getUTCDate());
      return strStartDate;
}


function updateHistPx(sym) {

    var getData = new Promise(function(resolve, reject) {
        db.all("SELECT date, symbol, price FROM hist_prices WHERE symbol=? ", sym, function(err, rows) {
            if (rows.length > 0) {
                //console.log(rows);
                resolve(rows);
            }  else {
                reject();
            }
            
        });        
    });

    getData.then(function(records) {
      var dates = [];  
      $.each(records, function(idx, ele) {
          dates.push(new Date(ele.date));
      });
      var maxDate = new Date(Math.max.apply(null, dates));
      var newDate = new Date(maxDate.getTime() + 24*60*60*1000);
      var todayDate = new Date();
      if ((todayDate - newDate) / (24*60*60*1000) > 3) {
        var strStartDate = buildString(newDate);
        console.log(strStartDate);
        histCall.histCall(sym, strStartDate);
      } else {
        console.log("too close to today?");
      }
    })
    .catch(function() {
        console.log('no history');
        histCall.histCall(sym, config.config.currStartDate);        
    });

}


updateHistPx('GRPN');
updateHistPx('AAPL');
updateHistPx('MSFT');
updateHistPx('PFE');
updateHistPx('%5eGSPC');
updateHistPx('TWO');
updateHistPx('%5eTNX');
updateHistPx('%5eTYX');
updateHistPx('IVR');
updateHistPx('VZ');
