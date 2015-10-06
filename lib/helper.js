(function() {
   'use strict';

   var path = require('path');

   var config = require('config');




   module.exports.getInputPath = function () {

      var configPath = config.migration.inputFolder;

      if (path.isAbsolute(configPath)) {
         return configPath;
      }

      return path.join(__dirname, configPath);

   };



   module.exports.getInputMetaExt = function() {

      var configInputMetaExt = config.migration.metaFileFormat;

      if (configInputMetaExt.charAt(0) === '.') {
         return configInputMetaExt;
      }

      return '.' + configInputMetaExt;

   };



   module.exports.getInputDataExt = function() {

      var configInputMetaExt = config.migration.dataFileFormat;

      if (configInputMetaExt.charAt(0) === '.') {
         return configInputMetaExt;
      }

      return '.' + configInputMetaExt;

   };



}());
