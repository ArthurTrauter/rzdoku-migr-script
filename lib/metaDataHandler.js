(function() {
  'use strict';

  var path = require('path');

  var _ = require('underscore');

  var helper = require('./helper.js');



  class metaDataHandler {



    constructor(metaData) {
      this.name = metaData.name;
      this.unloaddate = metaData.entladedatum;
      this.rcsstatus = metaData.rcsstatus;
      this.versions = createVersionList.call(this, metaData.version);
    }



    validate() {

      var self = this;

      return new Promise(function(resolve, reject) {

        if (self.name === null ||
          self.name === undefined ||
          self.name === "") {
          return reject('Invalid name attribute', self.name);
        }

        if (self.unloaddate === null ||
          self.unloaddate === undefined ||
          isValidDate(self.unloaddate) === false) {
          return reject('Date is not valid: ' + self.unloaddate);
        }

        if (self.rcsstatus === null ||
          self.rcsstatus === undefined ||
          self.rcsstatus === "") {
          return reject('Invalid rcsstatus: ' + self.rcsstatus);
        }

        if (self.versions === null ||
          self.versions === undefined ||
          self.versions === "") {
          return reject('Invalid versions: ' + self.versions);
        }

        if (Array.isArray(self.versions) === false) {
          return reject('versions is not an array: ' + self.versions);
        }

        // Prüft für jeden Eintrag zur Version das attribut v
        if (!arrayValidationCheck(self.versions, function(item) {
            if (item.v === null ||
              item.v === undefined ||
              typeof item.v != "number") {
              return false;
            }
            return true;
          })) {
          return reject('Invalid version numbers: ' + self.versions);
        }

        if (!arrayValidationCheck(self.versions, function(item) {
            if (item.letzetesCheckinVon === null ||
              item.letzetesCheckinVon === undefined ||
              item.letzetesCheckinVon === "") {
              return false;
            }
            return true;
          })) {
          return reject('Invalid versions.letzetesCheckinVon ' + self.versions);
        }

        if (!arrayValidationCheck(self.versions, function(item) {
            if (item.beschreibung === null ||
              item.beschreibung === undefined ||
              item.beschreibung === "") {
              return false;
            }
            return true;
          })) {
          return reject('Invalid versions.beschreibung: ' + self.versions);
        }



        resolve(self);
      });
    }



    getDocumentList() {

      var self = this;
      var documentList = [];

      self.versions.forEach(function(version) {

        var document = {
          name: self.name,
          version: version.v,
          description: version.beschreibung,
          lastCheckin: self.unloaddate,
          lastUser: version.letzetesCheckinVon
        };

        documentList.push(document);

      });

      return documentList;

    }



  }

  module.exports = metaDataHandler;



  function arrayValidationCheck(a, pred) {
    return a.every(function(obj, i) {
      if (!pred(obj)) {
        return false;
      }
      return true;
    });
  }



  function createVersionList(versionsObject) {

    var self = this;

    var versionList = [];
    var keyArray = _.keys(versionsObject);


    keyArray.forEach(function(key) {

      var versObject = versionsObject[key];
      versObject.type = key;
      versObject.documentPath = createDocumentPath.call(self, versObject);

      versionList.push(versObject);

    });

    return versionList;

  }



  function createDocumentPath(versionsObject) {

    var inputPath = helper.getInputPath();
    var documentName = this.name;
    var version = versionsObject.v;
    var documentFileFormat = helper.getInputDataExt();
    var fileName = documentName + '.' + version + documentFileFormat;

    return path.join(inputPath, fileName);

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
