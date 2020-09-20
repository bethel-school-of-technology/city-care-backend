const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');

const cors = require('cors'); //Include Cross Origin Resource Sharing To Connect With Angular Front End

const indexRouter = require('./routes/index.routes');
const usersRouter = require('./routes/users.routes');
const requestsRouter = require('./routes/requests.routes');
const listingsRouter = require('./routes/listings.routes');


const app = express()

.use(cors())

.use(logger('dev'))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())
.use(express.static(path.join(__dirname, 'public')))

.use('/', indexRouter)
.use('/users', usersRouter)
.use('/requests', requestsRouter)
.use('/listings', listingsRouter)

.use(function(req, res, next) {
          next(createError(404))
})
//Error handler
.use(function(error, req, res, next) {
//Set locals, only providing error in development
          res.locals.message = error.message;
          res.locals.error = req.app.get('env') === 'development' ? error: {};
//Render the error page
res.status(error.status || 500)
res.render('error')
})

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;     
const server =  app.listen(port, function() {
            console.log(`Server listening on the port::${port}`);
        });
//Connect to the MySQL Database
models.sequelize.sync().then(function () {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
