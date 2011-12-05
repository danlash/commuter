var request = require('request');

module.exports = function(options, log) {
    log = log || function() {};
    
    var origin = encodeURIComponent(options.start)
        , destination = encodeURIComponent(options.end)
        , url = 'http://maps.googleapis.com/maps/api/distancematrix/json?origins='+origin+'&destinations='+destination+'&units=imperial&sensor=false';
      
    if (options.verbose) console.log(url);

    
    request(options.url, function (error, response, body) {
      var matrix;
      
      if (options.verbose) log(body);
    
      if (error && response.statusCode !== 200) {
          log(error);
          log(response);
          return [];
      }
      
      matrix = JSON.parse(body);
      
      if (options.verbose) {
        log(matrix.origin_addresses);
        log(matrix.destination_addresses);
      }
      
      matrix.rows.forEach(function(originRow) {
        var times = [];
        
        originRow.elements.forEach(function(destinationElement) {
          times.push(destinationElement.duration);
        });
        
        return times;
      });

      return [];
    });
};