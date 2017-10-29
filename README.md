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
load.file('rf-api')

// plug in url2pdf into the api
load.module("rf-api-url2pdf", {
   saveDir: '/pdfTmp' // path where the pdfs are stored
});

```


### Use the service
```js

// load Services from API
var Services = require("rf-load").require("rf-api").API.ServiceFactory;

app.get('/pdf', function(req, res){

   var url = 'https://www.ebay.de';

   // @params: respond the pdf to the client
   Services.getPdf(url, res);

   // @example: optional callback
   Services.getPdf(url, res, function(pdf){
      // do sth with the pdf
   });

   // @example: get only file path
   var pdfFilePath = Services.getPdf(url, res, null, "getFilePath")
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
