'use strict';

var fs = require('fs');

var Bacon = require('baconjs').Bacon;
var config = require('config');
var log4js = require('log4js');

var readInput = require('./inputReader.js');

var logger = log4js.getLogger();



var documents = Bacon.repeat(readInput)
  .flatMap(function(value) {
    logger.info('--- value', value);
  });

documents.onError(function(error) {
  return logger.error("ERROR ", error);
});


module.exports = {};
