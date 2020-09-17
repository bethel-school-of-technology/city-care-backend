var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Import the models folder to use models within the application
var models = require('./models');


var cors = require('cors'); //Include Cross Origin Resource Sharing To Connect With Angular Front End
const multer = require('multer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestsRouter = require('./routes/requests');
var listingsRouter = require('./routes/listings');



const app = express(),
bodyParser = require('body-parser');
port = 3080;

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

app.use(function(req, res, next) {
          next(createError(404));
});
//Error handler
app.use(function(error, req, res, next) {
//Set locals, only providing error in development
          res.locals.message = error.message;
          res.locals.error = req.app.get('env') === 'development' ? error: {};
//Render the error page
res.status(error.status || 500);
res.render('error');
});
app.get('/', (req,res) => {
          res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
        });
        
        app.listen(port, () => {
            console.log(`Server listening on the port::${port}`);
        });
//Connect to the MySQL Database
models.sequelize.sync().then(function () {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
