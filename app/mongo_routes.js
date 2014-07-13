/*

Routes for MongoDB api calls

*/
var Book = require('./models/book');

module.exports = function(app) {

	//general handling for finding a book by id
	app.param('book_id', function(req, res, next, id) {

		Book.findById(req.params.book_id, function(err, book) {
			if(err)
				return next(err);
			if(!book) 
				return next('Error - failed to load book');

			req.book = book;
			return next();
		});

	});
	
	//get all books, sort by id
	app.get('/v1/books', function(req, res) {

		Book.find({}).sort({_id: 1}).exec(function(err, entries) {
  			
  			if (err) 
  				return res.send(500, err);
  			
  			if (!entries) {
    			return res.send(500, 'Error failed to load entries');
  			}

  			return res.json(entries);
		});
	});

	//save a new book
	app.post('/v1/books', function(req, res) {

		if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('title')) {
			return res.send(400, 'Error: post sytnax incorrect');
		}

		var book = new Book();
		book.author = req.body.author;
		book.title = req.body.title;

		book.save(function(err) {
			if(err)
				res.send(err);

			res.send(book);
		});

	});

	//getting a book by id
	app.get('/v1/books/:book_id', function(req, res) {
		res.send(req.book);
	});

	//finding a book by title
	app.get('/v1/books/title/:title', function(req, res) {

		Book.find({ title: { $exists: true, $in: [ req.params.title ] } }).exec(function(err, book) {
			if(err)
				return res.send(err);
			if(!book) 
				return res.send(400, 'Error failed to load book');

			res.send(book);

		});
	});

	//updating a book by id
	app.put('/v1/books/:book_id', function(req, res) {

		//check the syntax of post
		if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('title')) {
			return res.send(500, 'Error: Post syntax incorrect');
		}

		req.book.title = req.body.title;
		req.book.author = req.body.author;
		
		req.book.save(function(err, book) {
			if(err)
				res.send(err);
			else
				res.send(book);
		});

	});

	//deleting a book by id
	app.delete('/v1/books/:book_id', function(req, res) {

		req.book.remove(function(err, book) {
			if(err)
				return res.send(500, err);
			res.send(book);
		});

	});


	//main page
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});

};