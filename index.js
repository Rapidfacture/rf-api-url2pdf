/**
 * API service: url2pdf
 */

var url2pdf = require('url2pdf-plus');
var fs = require('fs');
var path = require('path');

module.exports.start = function (options, next) {
   return {
      getPdf: function (url, callback, getFilePath) { // Export
         callback = callback || function () {};
         getFilePath = getFilePath || false;
         // Add internal token for unblocking angular js request
         url = url + '?internal=ksdf6s80fsa9s0madf7s9df';
         url2pdf.renderPdf(url, {
            loadTimeout: 2000,
            saveDir: options.saveDir || path.joint(__dirname, 'pdfTmp')
            // debug: true
         })
            .then(function (filePath) {
               // console.log(filePath);
               if (getFilePath) { // just return filePath
                  callback(null, filePath);
               } else { // or return whole file
                  fs.readFile(filePath, function (err, data) {
                     if (err) {
                        callback('Server Error, function API.getPdf, readFile ' + filePath + ', ' + err);
                     } else {
                        callback(null, data);
                     }
                  });
               }
            })
            .catch(function (err) {
               callback('Error generating pdf, error: ' + err);
            });
      }
   };
};
