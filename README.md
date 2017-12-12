# rf-api-url2pdf

* create a pdf from a website via given url
* plugin for `rf-api`


## Getting Started

> npm install rf-api-url2pdf

### Init the service


```js
var Loader = require('rf-load').moduleLoader
var load = new Loader()
load.setModulePath(config.paths.modules)

// other stuff
load.file('db')
load.file('http')

// start request api
load.module('rf-api')

// plug in url2pdf into the api
load.module("rf-api-url2pdf", {
   saveDir: '/pdfTmp' // path where the pdfs are stored
});

```


### Use the service
```js

var API = require("rf-load").require("rf-api").API;

API.get('/pdf', function(req, res, services){

   var url = 'https://www.ebay.de';

   // Example1: respond the pdf to the client
   services.getPdf(url, res.send);

   // Example2: optional callback
   services.getPdf(url, function(err, pdf) {
      // do sth with the pdf
   });

   // Example3: get only file path
   Services.getPdf(url, function(err, pdfFilePath) {
      //
   }, true)
})


```

## Peer Dependencies
* rf-api


## Development

Install the dev tools with

> npm install

Then you can runs some test cases and eslint with:

> npm test


## Legal Issues
* License: MIT
* Author: Rapidfacture GmbH
