'use strict';

var fs = require('fs');

var Bacon = require('baconjs').Bacon;
var config = require('config');
var log4js = require('log4js');

var readInput = require('./inputReader.js');
var metaDataValidator = require('./metaDataValidator.js');



var logger = log4js.getLogger();



var documents = readInput()

  .flatMap(function (value) {
     var retPromise = metaDataValidator.validate(value)
      .then(function (value) {
         return(value);
      })
      .catch(function (error) {
         // logger.error('Validation Error occured: ', error);
         return new Bacon.Error('Validation Error occured: ' + error);
      });
      return Bacon.fromPromise(retPromise);
  })

  .flatMap(function (value) {
    logger.info('--- value', value);
    return value;
});


documents.onError(function(error) {
  // TODO: Errorhandling einbauen
  return logger.error("ERROR ", error);
});


module.exports = {};
