var express = require('express'),
    mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel')

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use('/api', bookRouter);

bookRouter.route('/Books')
    .get(function(req, res){
        var responseJson = {hello: "api"};

        res.json(responseJson);
    });

app.get('/', function(req, res){
    res.send('bienvenido');
});

app.listen(port, function(){
    console.log('Desde gulp, Server en puerto: ' + port);
}); 