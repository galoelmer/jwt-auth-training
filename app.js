var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');

var homeRoute = require('./routes/home');
var cardsRoute = require('./routes/cards');
var authRoutes = require('./routes/authRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// database connection
const dbURI =
  'mongodb+srv://dbUser:test123@cluster0.zche8.gcp.mongodb.net/jwtDB?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Successful connection to mongoDb');
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use('/', homeRoute);
app.use('/cards', cardsRoute);
app.use(authRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
