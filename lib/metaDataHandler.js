(function() {
  'use strict';

  var log4js = require('log4js');
  var _ = require('underscore');


  var logger = log4js.getLogger();



  class metaDataHandler {



    constructor(metaData) {
      this.name = metaData.name;
      this.unloaddate = metaData.entladedatum;
      this.rcsstatus = metaData.rcsstatus;
      this.versions = createVersionList(metaData.version);
    }



    validate() {

      var self = this;

      return new Promise(function(resolve, reject) {

        // logger.info('--- metaDataValidator.value', value);

        if (self.name === null || self.name === undefined) {
          reject('Invalid name attribute', self.name);
        }

        if (self.unloaddate === null ||
          self.unloaddate === undefined ||
          isValidDate(self.unloaddate) === false) {
          reject('Date is not valid: ' + self.unloaddate);
        }

        // TODO: other validation-functions

        resolve(self);
      });
    }



    getVersionList() {

      var versionList = [];

      versionList.push({
        "aktuell": this.versions.aktuell
      });
      versionList.push({
        "produktiv": this.versions.produktiv
      });

      return versionList;
    }



  }



  module.exports = metaDataHandler;



  function createVersionList(versionsObject) {

    var versionList = [];
    var keyArray = _.keys(versionsObject);

    keyArray.forEach(function(key) {
      // var versObject = new VersionHandler(key, versionsObject.key);
      // versObject.addVersionPath();
      // versObject.
    });



  }



  function isValidDate(date) {

    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);

    if (matches === null) return false;

    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);

    return composedDate.getDate() == d &&
      composedDate.getMonth() == m &&
      composedDate.getFullYear() == y;
  }



}());
