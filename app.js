const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');
//Auth0 Authentication
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();


// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// //Import the models folder to use models within the application
// var models = require('./models');
const port = process.env.PORT || 3001;

const jwtCheck = jwt({
       secret: jwks.expressJwtSecret({
         cache: true,
         rateLimit: true,
         jwksRequestsPerMinute: 5,
         jwksUri: 'https://tekwebtek.us.auth0.com/.well-known/jwks.json'
       }),
       audience: 'https://city_care_api',
       issuer: 'https://tekwebtek.us.auth0.com/',
       algorithms: ['RS256']
});
app.use(jwtCheck);
app.get('/authorized', function(req, res) {
  res.send('Secured Resource!')
})

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
        
        app.listen(port, () => {
            console.log(`Server listening on the port::${port}`);
        });
//Connect to the MySQL Database
models.sequelize.sync().then(function () {
          console.log('App Connected & Sync\'d up!')
})
module.exports = app;
