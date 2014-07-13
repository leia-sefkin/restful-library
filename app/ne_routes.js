/*

Routes for nedb api calls

*/
module.exports = function(app) {

	//general handling for finding a book by id
	app.param('book_id', function(req, res, next, id) {

		db.findOne({ _id : req.params.book_id}, function(err, book) {
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

		db.find({}).sort({ _id : 1}).exec(function(err, entries) {
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
			return res.send(400, 'Error - post sytnax incorrect');
		}

		var book = {
			author : req.body.author,
			title : req.body.title
		}

		db.insert(book, function(err) {
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

		db.findOne({ title: req.params.title }).exec(function(err, book) {
			if(err)
				return next(err);
			if(!book) 
				return next(new Error('failed to load book'));

			res.send(book);

		});
	});

	//updating a book by id
	app.put('/v1/books/:book_id', function(req, res) {

		//check the syntax of post
		if(!req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('title')) {
			return res.send('Error 400: Post syntax incorrect');
		}

		var updated_book = {
			_id: req.params.book_id,
			author: req.body.author,
			title: req.body.title
		}
		
		db.update({ _id : req.params.book_id }, updated_book, {}, function(err) {
			if(err)
				res.send(500, err);

			res.send(updated_book);
		});

	});

	//deleting a book by id
	app.delete('/v1/books/:book_id', function(req, res) {

		db.remove({ _id : req.params.book_id } , function(err, book) {
			if(err)
				return res.send(500, err);
			res.send(book);
		});

	});

	//main page
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};