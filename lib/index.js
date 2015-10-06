'use strict';

var Bacon = require('baconjs').Bacon;
var log4js = require('log4js');

var readInput = require('./inputReader.js');
var MetaDataHandler = require('./metaDataHandler.js');



var logger = log4js.getLogger();



var documents = Bacon.once()

   .flatMap(function () {
      var documents = readInput();
      return documents;
   })

   .flatMap(function (value) {
      var metaData = new MetaDataHandler(value);
      return metaData;
   })

   .flatMap(function (value) {
      var retPromise = value.validate(value);
      return Bacon.fromPromise(retPromise);
   })

   // .flatMap(function (value) {
   //    var fileVersions = [];
   //    return Bacon.fromArray(fileVersions);
   // })

   .flatMap(function (value) {
       logger.info('--- value', value);
       return value;
    });


documents.onError(function(error) {
  // TODO: Errorhandling einbauen
  return logger.error("ERROR ", error);
});


module.exports = {};
