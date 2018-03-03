/**
 * API service: url2pdf
 */
const url2pdf = require('url2pdf-plus');
const fs = require('fs');


module.exports.start = function (options, next) {
   return {

      getPdf: function (urls, callback, options) {

         // options
         options = options || {};
         let opts = {
            loadTimeout: options.loadTimeout || 2000
         };
         if (options.saveDir) opts.saveDir = options.saveDir;
         if (options.debug) opts.debug = options.debug;

         if (urls instanceof String) { // allow passing a single url as string
            urls = [urls];
         }

         // create a promise for each url
         let promises = [];
         for (let url of urls) {
            promises.push(url2pdf.renderPdf(url, opts));
         }

         // Wait until all PDFs are finished ...
         Promise.all(promises).then(filepaths => {

            if (options.onlyFilePath) {
               callback(null, filepaths);
            } else {
               // single pdf => return it
               if (filepaths.length === 1) {
                  const fileContent = fs.readFileSync(filepaths[0]);
                  fs.unlinkSync(filepaths[0]);
                  callback(null, new Buffer(fileContent, 'binary').toJSON());

               // several pdfs => merge them and return them
               } else {
                  const jointPDF = url2pdf.join(filepaths, null, 'onlyFile');
                  callback(null, new Buffer(jointPDF, 'binary').toJSON());
               }
            }

         }).catch(callback);
      }


   };
};
