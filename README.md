# rf-api-url2pdf

* unstable - do not use now
* will be the common part for every rapidfacture app

API url to pdf service.


## Getting Started

> npm install rf-api-url2pdf

## Example
```js
// load API
var API = require("rf-load").require("rf-api").API;

// load module and give saveDir parameter (path where the pdfs are stored)
require("rf-load").module("rf-api-url2pdf", {saveDir: '/pdfTmp'}); 

/** 
* getPdf: get Pdf from Url
*
* @param url: URL string
* @param res: Express ressource
* @param callback: (optional) callback function
* @param getFilePath: (boolean) only get the pdf file path
*/
API.ServiceFactory.getPdf(url, res, callback, getFilePath); // execute getPdf function
```

## Dependencies

Needs to have url2pdf-plus & rf-api to be installed.


## Legal Issues
* License: MIT
* Author: Rapidfacture GmbH
