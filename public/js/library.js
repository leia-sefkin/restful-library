/*
library.js 

all things necessary for managing the client side
sets up angular module with config, service and controller

service points to api (/server.js)

controller drives calls to api for CRUD operations
an array of current list is kept for fast view modifications

since this only works with one collection (books)
everything is kept within this file (instead of being abstracted)

this could easily be extended to handle other collections
*/

'use strict';

var library = angular.module('library', 
	['ngRoute', 'ngResource']
);

library.config(function ($routeProvider) {
  $routeProvider
  		// home page
		.when('/', {
			templateUrl: 'views/books.html',
			controller: 'BookController'
		})

		.otherwise({redirectTo: '/'});

});

library.factory('BookService', function ($resource) {

	return $resource('/v1/books/:book_id', {}, {
		query: {method:'GET', params:{book_id:''}, isArray:true},
  		post: {method:'POST'},
  		update: {method:'PUT', params: {book_id: '@book_id'}},
  		remove: {method:'DELETE', params: {book_id: '@book_id'}}
	});

});


library.controller('BookController', function ($scope, BookService) {

	//the current list of books
	BookService.query(function(books) {
		$scope.books = books;
	});

	//update or add a new book
	$scope.editBook = function (book) {
		if (book === 'new') {
      		$scope.newBook = true;
      		$scope.book = {
      			author: '',
      			title: ''
      		};
    	} else {
      		$scope.newBook = false;
      		$scope.book = book;
    	}
	};

	//save a new book or update one
	$scope.save = function() {
		if(!$scope.book._id) {
			var newBook = new BookService($scope.book);
			newBook.$save(function () {
				$scope.books.push(newBook);
			});
		} else {
			var updatedBook = new BookService($scope.book);
			updatedBook.$update({book_id: $scope.book._id});
		}
	};

	//remove by id
	$scope.delete = function() {
    	var item_to_delete = new BookService($scope.book);
    	var index = $scope.books.indexOf($scope.book);
    	item_to_delete.$delete({book_id: $scope.book._id}, function(book) {
    		$scope.books.splice(index, 1);
    	});
  	};


});

