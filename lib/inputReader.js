(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');

  var Bacon = require('baconjs').Bacon;
  var toml = require('toml');
  var log4js = require('log4js');

  var helper = require('./helper.js');



  var logger = log4js.getLogger();
  var inputPath = helper.getInputPath();
  var inputExt = helper.getInputMetaExt();



  module.exports = function() {

    return Bacon.fromNodeCallback(fs.readdir, inputPath)

    .flatMap(function(value) {
      return Bacon.fromArray(value);
    })

    .filter(function(value) {
      var inputFileExt = path.extname(value);
      if (inputExt === inputFileExt) {
        return true;
      }
      return false;
    })

    .flatMap(function(value) {
      logger.trace("read file: " + value);
      return path.join(inputPath, value);
    })

    .flatMap(function(value) {
      return Bacon.fromNodeCallback(fs.readFile, value, 'utf8');
    })

    .flatMap(function(value) {
      return toml.parse(value);
    });

  };



}());
