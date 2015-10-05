(function() {
  'use strict';

  var fs = require('fs');
  var Bacon = require('baconjs').Bacon;

  module.exports = function(sink) {
    return Bacon.sequentially(1000, ["B", "A", "C", "O", "N"]);
  };


}());
