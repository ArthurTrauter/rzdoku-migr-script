(function() {
  'use strict';

  var fs = require('fs');
  var path = require('path');

  var Bacon = require('baconjs').Bacon;
  var config = require('config');

  var helper = require('./helper.js');


  var inputPath = helper.getInputPath();
  var inputExt = helper.getInputMetaExt();



  module.exports = function() {

  return Bacon.fromNodeCallback(fs.readdir, inputPath)

    .flatMap(function (value) {
      console.log("flatMap1-value", value);
      return Bacon.fromArray(value);
    })

    .filter(function (value) {
      var inputFileExt = path.extname(value);
       if (inputExt === inputFileExt) {
          return true;
       }
       return false;
    })

    .flatMap(function (value) {
      console.log("flatMap2-value", value);
      return path.join(inputPath, value);
    })

    .flatMap(function (value) {
      return Bacon.fromNodeCallback(fs.readFile, value, 'utf8');
    });

  };



}());
