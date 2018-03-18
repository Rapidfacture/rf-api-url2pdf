/**
 * API service: url2pdf
 */
const url2pdf = require('url2pdf-plus');
const fs = require('fs');

let mainOptions = {};

module.exports.start = function (options) {

   options = options || {};
   mainOptions = options || {};
   if (options.buffer !== undefined) {
      mainOptions.buffer = options.buffer;
   } else {
      mainOptions.buffer = true;
   }


   return {

      getPdf: function (urls, callback, options) {

         // options
         options = options || {};
         let opts = mainOptions;
         opts.loadTimeout = options.loadTimeout || 2000;
         if (options.saveDir !== undefined) opts.saveDir = options.saveDir;
         if (options.debug !== undefined) opts.debug = options.debug;
         if (options.buffer !== undefined) opts.buffer = options.buffer;


         if (typeof urls === 'string') { // allow passing a single url as string
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
                  let fileContent = fs.readFileSync(filepaths[0]);
                  fs.unlinkSync(filepaths[0]);
                  if (opts.buffer) fileContent = new Buffer(fileContent, 'binary').toJSON();
                  callback(null, fileContent);

               // several pdfs => merge them and return them
               } else {
                  let fileContent = url2pdf.join(filepaths, null, 'onlyFile');
                  if (opts.buffer) fileContent = new Buffer(fileContent, 'binary').toJSON();
                  callback(null, new Buffer(fileContent, 'binary').toJSON());
               }
            }

         }).catch(callback);
      }


   };
};
