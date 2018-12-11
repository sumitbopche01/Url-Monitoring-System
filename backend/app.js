var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/urlMonitor', { useNewUrlParser: true },(error) => {
  if(error){
    console.log("Error while connecting to mongodb");
  }
  else{
    console.log("connected to mongodb localhost");
  }
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
