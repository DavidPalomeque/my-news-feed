const date = require('date-and-time');

exports.transformDate = function (textDate) {
    var dates = {}
  
    switch (textDate) {
      case 'today':
        dates.from = date.format(new Date(), 'YYYY/MM/DD');
        dates.to = date.format(new Date(), 'YYYY/MM/DD');
        break;
  
      case 'yesterday':
        dates.from = date.format(date.addDays(new Date(), -1), 'YYYY/MM/DD');
        dates.to = date.format(date.addDays(new Date(), -1), 'YYYY/MM/DD');
        break;
      
      case 'lastWeek':
        dates.from = date.format(date.addDays(new Date(), -7), 'YYYY/MM/DD');
        dates.to = date.format(new Date(), 'YYYY/MM/DD');
        break;
  
      case 'lastMonth':
        dates.from = date.format(date.addDays(new Date(), -28), 'YYYY/MM/DD'); // maybe 31?
        dates.to = date.format(new Date(), 'YYYY/MM/DD');
        break;
    
      default:
        break;
    }
  
    return dates;
}