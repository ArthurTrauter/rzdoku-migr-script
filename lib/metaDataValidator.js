(function() {
   'use strict';

   var log4js = require('log4js');


   var logger = log4js.getLogger();



   module.exports.validate = function (value) {

      return new Promise(function (resolve, reject) {

         // logger.info('--- metaDataValidator.value', value);

         if (value === null || value === undefined) {
            reject('Empty Meta-Data-Object');
         }

         if (value.name === null || value.name === undefined) {
            reject('Invalid name attribute', value.name);
         }

         if (value.entladedatum === null ||
             value.entladedatum === undefined ||
             isValidDate(value.entladedatum) === false) {
            reject('Date is not valid', value.entladedatum);
         }

         // TODO: other validation-functions
         
         resolve(value);
      });
   }



   function isValidDate(date) {

       var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);

       if (matches == null) return false;

       var d = matches[2];
       var m = matches[1] - 1;
       var y = matches[3];
       var composedDate = new Date(y, m, d);

       return composedDate.getDate() == d &&
              composedDate.getMonth() == m &&
              composedDate.getFullYear() == y;
   }

}());
