const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');


const app = express();




const cors = require('cors'); //Include Cross Origin Resource Sharing To Connect With Angular Front End


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const requestsRouter = require('./routes/requests');
const listingsRouter = require('./routes/listings');




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
// app.get('/', (req,res) => {
//           res.sendFile(process.cwd()+"/my-app/dist/angular-nodejs-example/index.html")
//         });
   const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;     
  const server =  app.listen(port, function() {
            console.log(`Server listening on the port::${port}`);
        });
//Connect to the MySQL Database
models.sequelize.sync().then(function () {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
