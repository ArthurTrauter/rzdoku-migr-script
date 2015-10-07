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
          beschreibung: 'Notiz zur versions. Darf über mehrere Zeilen gehen'
        },
        produktiv: {
          v: 0,
          letzetesCheckinVon: 'trautear',
          beschreibung: 'Notiz zur versions. Darf über mehrere Zeilen gehen'
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
        done('--- validation-error.name: ' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.name = null;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.name: ' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.name = undefined;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.name: ' + _mDObject.name);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



  it(' -  should reject promise when status is empty', function(done) {

    metaDataObject.rcsstatus = null;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.rcsstatus: ' + _mDObject.rcsstatus);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.rcsstatus = undefined;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.rcsstatus: ' + _mDObject.rcsstatus);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.rcsstatus = "";
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.rcsstatus: ' + _mDObject.rcsstatus);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



  it(' -  should reject promise when versions is empty', function(done) {

    metaDataObject.versions = null;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.version: ' + _mDObject.version);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.versions = undefined;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.version: ' + _mDObject.version);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.versions = "";
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.version: ' + _mDObject.version);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



  it(' -  should reject promise when versions is not an array', function(
    done) {

    // metaDataObject.versions = "String";
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.version: ' + _mDObject.version);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



  it.skip(' -  should reject promise when versions.v is empty', function(
    done) {

    metaDataObject.versions.v = null;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.versions.v: ' + _mDObject.version
          .v);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.versions.v = undefined;
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.versions.v: ' + _mDObject.version
          .v);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    metaDataObject.versions.v = "";
    metaDataObject.validate()
      .then(function(_mDObject) {
        done('--- validation-error.versions.v: ' + _mDObject.version
          .v);
      })
      .catch(function(err) {
        expect(err).toExist();
      });

    setTimeout(function() {
      done();
    }, 100);

  });



  it.skip(
    ' -  should reject promise when versions.letzetesCheckinVon is empty',
    function(done) {

      metaDataObject.versions.letzetesCheckinVon = null;
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.letzetesCheckinVon: ' +
            _mDObject.versions.letzetesCheckinVon);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      metaDataObject.versions.letzetesCheckinVon = undefined;
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.letzetesCheckinVon: ' +
            _mDObject.versions.letzetesCheckinVon);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      metaDataObject.versions.letzetesCheckinVon = "";
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.letzetesCheckinVon: ' +
            _mDObject.versions.letzetesCheckinVon);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      setTimeout(function() {
        done();
      }, 100);

    });



  it.skip(' -  should reject promise when versions.beschreibung is empty',
    function(done) {

      metaDataObject.versions.beschreibung = null;
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.beschreibung: ' +
            _mDObject.versions.beschreibung);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      metaDataObject.versions.beschreibung = undefined;
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.beschreibung: ' +
            _mDObject.versions.beschreibung);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      metaDataObject.versions.beschreibung = "";
      metaDataObject.validate()
        .then(function(_mDObject) {
          done('--- validation-error.versions.beschreibung: ' +
            _mDObject.versions.beschreibung);
        })
        .catch(function(err) {
          expect(err).toExist();
        });

      setTimeout(function() {
        done();
      }, 100);

    });



});
