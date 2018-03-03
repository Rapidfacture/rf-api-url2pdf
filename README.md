# rf-api-url2pdf

Create a pdf from a website via given url, return the pdf file content as buffer.
Take snapshots of multiple sites and merge the pdfs, when an array of urls is passed.


## Getting Started

> npm install rf-api-url2pdf

### Init the service

```js

var services: {
   getPdf: require('rf-api-url2pdf').start({
      saveDir: '/pdfTmp' // path where the pdfs are stored
   }).getPdf
}


```

### Use the service
```js

// simple example
service.getPdf( 'http://www.ebay.de', function(err, pdfBuffer){
   console.log(pdfBuffer);
})

// take a snapshot of multiple sites and join the pdfs
var urls = ['http://www.ebay.de', 'http://www.google.com'];

service.getPdf(urls, function(err, pdfBuffer){
   console.log(pdfBuffer);
})

// with rf-api
API.post('/pdf', function(req, res){
   service.getPdf('http://www.test.com', res.send);
})


// options
var options = {
   saveDir: '/exportTemp'  // optional alternativ path to create pdfs
   loadTimeout: 3000,      // timeout in [ms] to wait till site should be loaded
   onlyFilePath: false,    // only return path to pdf files, do not read them in
   buffer: false,          // false: return file content; true: return a buffer from binary file content
   debug: true             // optional show phantom debug messages
};
service.getPdf(urls, callback, options)
```

## Development

Install the dev tools with

> npm install

Then you can runs some test cases and eslint with:

> npm test


## Legal Issues
* License: MIT
* Author: Rapidfacture GmbH
