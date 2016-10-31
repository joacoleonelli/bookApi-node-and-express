var express = require('express');
var mongoose = require('mongoose');
var Types = mongoose.Types;
var ObjectId = Types.ObjectId;

var routes = function(Book){
    var bookRouter = express.Router();

    bookRouter.route('/')
    .post(function(req, res){
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function(req, res){
        var query = req.query;
        Book.find(query, function(err, books){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(books);
            }
        });
    });

    bookRouter.route('/:bookId')
    .get(function(req, res){
        Book.findById(new ObjectId(req.params.bookId), function(err, book){
            if(err){
                res.status(500).send(err);
            }else{
                res.json(book);
            }
        });
    })
    .put(function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if(err){
                res.status(500).send(err);
            }else{
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                res.json(book);
            }
        });
    });

    return bookRouter;
};

module.exports = routes;