/**
 * API service: url2pdf
 */

var url2pdf = require('url2pdf-plus'),
   fs = require('fs'),
   API = require('rf-load').require('rf-api').API

module.exports.start = function (options, next) {
   /**
    * getPdf: get Pdf from Url
    *
    * @param url: URL string
    * @param callback: (optional) callback function
    * @param getFilePath: (boolean) only get the pdf file path
    * @example
    * @example
    * // execute a registred service function
    * var API = require("rf-load").require("API");
    *
    *  API.post("get-pdf", function(req, res, services) {
    *    services.getPdf(url, function (err, pdf) {
    *        //
    *    })
    *  })
    *
    */
   function getPdf (url, callback, getFilePath) { // Export
      callback = callback || function () {}
      getFilePath = getFilePath || false
      // Add internal token for unblocking angular js request
      url = url + '?internal=ksdf6s80fsa9s0madf7s9df'
      url2pdf.renderPdf(url, {
         loadTimeout: 2000,
         saveDir: options.saveDir
         // debug: true
      })
         .then(function (filePath) {
            // console.log(filePath);
            if (getFilePath) { // just return filePath
               callback(null, filePath)
            } else { // or return whole file
               fs.readFile(filePath, function (err, data) {
                  if (err) {
                     callback('Server Error, function API.getPdf, readFile ' + filePath + ', ' + err)
                  } else {
                     callback(null, data)
                  }
               })
            }
         })
         .catch(function (err) {
            callback('Error generating pdf, error: ' + err)
         })
   };

   API.Services.registerFunction(getPdf)

   next()
}
