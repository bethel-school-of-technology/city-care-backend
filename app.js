var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Import the models folder to use models within the application
var models = require('./models');
var cors = require('cors'); //Include Cross Origin Resource Sharing To Connect With Angular Front End

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestsRouter = require('./routes/requests');
var listingsRouter = require('./routes/listings');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/requests', requestsRouter);
app.use('/listings', listingsRouter);



//Connect to the MySQL Database
models.sequelize.sync().then(function () {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
