/* jshint node: true */ "use strict";

/**
 * API service: url2pdf
 */

var url2pdf = require("url2pdf-plus"),
	require("fs"),
	rvar config = require("rf-config"),
	log = require("rf-log"),
	API = require("rf-load").require("rf-api").API;

module.exports.start = function(options, next) {

	function getPdf(url, res, callback, getFilePath) { // Export
	  //Add internal token for unblocking angular js request
	  url = url + '?internal=ksdf6s80fsa9s0madf7s9df';
	  url2pdf.renderPdf(url, {
	      loadTimeout: 2000,
	      saveDir: config.paths.webserver + "/pdfTemp",
	      //debug: true
	    })
	    .then(function(filePath) {
	      //console.log(filePath);
	      if(getFilePath){  // just return filePath
	          callback(filePath, res);
	      }else{ // or return whole file
	          fs.readFile(filePath, function(err, data) {
	              if(err){
	                  res.status(404).send('Server Error, function API.getPdf, readFile ' + filePath + ", "  + err).end();
	              }else if(callback){
	                  callback(data, res);
	              }else{
	                  // default "send" method converts binary data to a UTF8 string
	                  //  => pdf modified (not working any longer)
	                  // prevent this by creating an json array before sending
	                  res.status(200).send(new Buffer(data, 'binary').toJSON());
	              }
	          });
	      }
	    })
	    .catch(function(err) {
	      res.status(404).send("Error generating pdf, error: " + err);
	    });
	};

	API.ServiceFactory.registerFunction(getPdf);

	//console.log(API);

	next();

};
