var express = require('express');
var app = express();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/foods');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	req.db = db;
	next();
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});


app.get('/', function(req, res) {
	res.render('landingPage');
});

app.get('/customerList', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
	    res.render('customerItemList', {
	        "customerItemList" : docs
	    });
	});
});

app.get('/customerIndividual/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({_id: req.params.id},function(e, docs) {
		console.log(docs[0]);
		res.render('customerIndividual', {'item': docs[0]});
	});
});

app.get('/grocerList', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		console.log(docs[0]);
	    res.render('grocerItemList', {
	        "grocerItemList" : docs
	    });
	});
});

app.get('/addItem', function(req, res) {
	res.render('addItem');
});

app.get('/dynamicDiscount', function(req, res) {
	res.render('dynamicDiscount');
});

app.post('/addItem', function(req, res) {
	console.log(req.body);
});
