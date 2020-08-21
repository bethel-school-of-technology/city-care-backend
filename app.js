var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Import the models folder to use models within the application
var models = require('./models');
var cors = require('cors'); //Include Cross Origin Resource Sharing To Connect With Angular Front End

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//add orgs router
var orgsRouter = require('./routes/orgs');
var requestsRouter = require('./routes/requests');
var listingsRouter = require('./routes/listings');

var app = express();
//Use Cross Origin Resource Sharing In The Application
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//use the orgs route
app.use('/orgs', orgsRouter);
app.use('/requests', requestsRouter);
app.use('/listings', listingsRouter);

app.use(function(req, res, next) {
          next(createError(404));
});
//Error handler
app.use(function(err, req, res, next) {
//Set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err: {};
//Render the error page
res.status(err.status || 500);
res.render('error');
});
//Connect to the MySQL Database
models.sequelize.sync().then(function() {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
