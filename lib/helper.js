(function() {
  'use strict';

  var path = require('path');

  var config = require('config');
  var request = require('request');


  var user;


  var options = config.tragetSystem;
  exports.options = options;



  function getInputPath() {

    var configPath = config.migration.inputFolder;

    if (path.isAbsolute(configPath)) {
      return configPath;
    }

    return path.join(__dirname, configPath);

  }

  exports.getInputPath = getInputPath;



  function getInputMetaExt() {

    var configInputMetaExt = config.migration.metaFileFormat;

    if (configInputMetaExt.charAt(0) === '.') {
      return configInputMetaExt;
    }

    return '.' + configInputMetaExt;

  }

  exports.getInputMetaExt = getInputMetaExt;



  function getInputDataExt() {

    var configInputMetaExt = config.migration.dataFileFormat;

    if (configInputMetaExt.charAt(0) === '.') {
      return configInputMetaExt;
    }

    return '.' + configInputMetaExt;

  }

  exports.getInputDataExt = getInputDataExt;



  /**
   * Create one document
   * @param  Object document
   * @return Object
   */
  function createDocument(document) {

    var opts = {
      url: options.urls.base + options.urls.documents,
      method: "post",
      json: document
    };

    return doRequest(opts);

  }

  exports.createDocument = createDocument;



  /**
   * [function description]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  function doRequest(opts) {

    return new Promise(function(resolve, reject) {

      if (user && user.token) {
        opts.auth = {
          "bearer": user.token
        };
      }

      request(opts, function(err, res, body) {

        if (err) {
          return reject(err);
        }
        if (res.statusCode !== 200) {
          err = new Error(
            "Statuccode was not 200, " +
            "\n\nRequest was: " +
            JSON.stringify(opts, null, 1) +
            "\n\nBody was: " +
            JSON.stringify(body, null, 1));
          err.code = res.statusCode;
          err.name = body.name || "Error";
          return reject(err);
        }

        resolve(body);

      });
    });
  }

  exports.doRequest = doRequest;



  function login(username, password) {

    var opts = {
      url: options.urls.base + options.urls.login,
      method: "post",
      auth: {
        username: username || "test",
        password: password || "test"
      }
    };

    opts.json = opts.auth;

    return doRequest(opts)
      .then(function(result) {
        user = result;
        return result;
      });

  }

  exports.login = login;



}());
