# Collection Management Library

This web application allows for CRUD operations on a library collection (books). The library can be configured to hook into two separate data stores - MongoDB or [nedb](https://github.com/louischatriot/nedb). Default is mongo, but can be congigured via NODE_ENV or via [server.js](https://github.com/leia-sefkin/restful-library/blob/master/server.js) line 14. Routes and models for the API are found under [app](https://github.com/leia-sefkin/restful-library/blob/master/app).
 
nedb stores in memory but can be configured for various other options (see [nedb docs](https://github.com/louischatriot/nedb/blob/master/README.md)).

The front end is driven by Angular and Bootstrap, with everything stored under [public](https://github.com/leia-sefkin/restful-library/blob/master/public)



## Installation

Prerequisites:
- NodeJS 0.10
- MongoDB 2+
- Bower (nmp install -g bower http://bower.io/)

 `npm install`
 
 `bower install`

## Running The App

From the root of the project

 `node server.js`

Once running, the UI is accessible at:

[http://localhost:3000](http://localhost:3000)

API routes are located at /v1/books
