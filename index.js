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
    *    services.createPdf(req.data, function (pdf){
    *          var corrected = processPdf(pdf)
    *          res.send(corrected)
    *    })
    *  })
    *
    */
   function getPdf (url, callback, getFilePath) { // Export
      var res = this.res // get express response from parent function
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
               callback(filePath, res)
            } else { // or return whole file
               fs.readFile(filePath, function (err, data) {
                  if (err) {
                     res.status(404).send('Server Error, function API.getPdf, readFile ' + filePath + ', ' + err).end()
                  } else if (callback) {
                     callback(data, res)
                  } else {
                     // default "send" method converts binary data to a UTF8 string
                     //  => pdf modified (not working any longer)
                     // prevent this by creating an json array before sending
                     res.status(200).send(new Buffer(data, 'binary').toJSON())
                  }
               })
            }
         })
         .catch(function (err) {
            res.status(404).send('Error generating pdf, error: ' + err)
         })
   };

   API.Services.registerFunction(getPdf)

   // console.log(API);

   next()
}
