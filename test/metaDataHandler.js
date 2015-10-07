'use strict';

var expect = require('expect');

var metaDataHandler = require('../lib/metaDataHandler.js');

var metaDataObject;



describe('meta-data-handler', function() {

  beforeEach(function() {

    var metaData = {
      name: 'vorlage1',
      entladedatum: '05-10-2015',
      rcsstatus: 'Archiviert',
      version: {
        aktuell: {
          v: 0,
          letzetesCheckinVon: 'trautear',
          beschreibung: 'Notiz zur Version. Darf über mehrere Zeilen gehen'
        },
        produktiv: {
          v: 0,
          letzetesCheckinVon: 'trautear',
          beschreibung: 'Notiz zur Version. Darf über mehrere Zeilen gehen'
        }
      }
    };

    metaDataObject = new metaDataHandler(metaData);

  });



  it(' -  should create new meta-data-handler', function() {

    expect(metaDataObject).toExist();

  });



  it(' -  should reject promise when date-error', function() {

    metaDataObject.unloaddate = 'XX-10-2015';
    metaDataObject.validate()
      .then(function(_mDObject) {
        expect(_mDObject).toNotExist();
      })
      .catch(function(err) {
        expect(err).toExist();
      });

  });



  it(' -  should reject promise when name is empty', function(done) {

    metaDataObject.name = "";
    metaDataObject.validate()
      .then(function(_mDObject) {
        expect(_mDObject).toNotExist();
        done('--- validation-error.name' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.name = null;
    metaDataObject.validate()
      .then(function(_mDObject) {
        expect(_mDObject).toNotExist();
        done('--- validation-error.name' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.name = undefined;
    metaDataObject.validate()
      .then(function(_mDObject) {
        expect(_mDObject).toNotExist();
        done('--- validation-error.name' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



});
