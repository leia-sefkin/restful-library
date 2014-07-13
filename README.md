# Collection Management Library

This web application allows for CRUD operations on a library collection (books). 

The library can be configured to hook into two separate data stores - MongoDB or [nedb](https://github.com/louischatriot/nedb). Default is mongo, but can be congigured via NODE_ENV or via /server.js. nedb stores in memory but can be configured for various other options (see nedb docs).

The front end is driven by Angular and Bootstrap.

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
