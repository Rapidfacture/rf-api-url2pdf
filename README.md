# rf-api-url2pdf

Create a pdf from a website via given url.


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
service.getPdf(url, function(err, pdfPreviewPic){
   console.log(pdfPreviewPic);
})


// return only the path to the file
service.getPdf(url, function(err, filePath, 'getFilePath'){
   console.log(filePath);
})


// with rf-api
API.post('/pdf', function(req, res){
   service.getPdf('http://www.test.com', res.send);
})
```

## Development

Install the dev tools with

> npm install

Then you can runs some test cases and eslint with:

> npm test


## Legal Issues
* License: MIT
* Author: Rapidfacture GmbH
