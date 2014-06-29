var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoskin = require('mongoskin');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to db
var connString = process.env.MONGODB_DB_URL || "mongodb://@localhost:27017/knidos";
var db = mongoskin.db(connString, {safe:true});
console.log('mongo: ' + db);
app.param('collectionName', function(req, res, next, collectionName) {
    console.log('rest request. coll: ' + collectionName);
    req.collection = db.collection(collectionName);
    next();
});


// Routes
// app.use(app.router);
app.use('/', require('./routes/index').middleware);

// Generic REST. Just for rapid prototyping
app.use('/rest', require('./routes/rest').middleware)


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
