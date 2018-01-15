//  Created by Sanchit Saxena on 2018-01-15
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const compression = require('compression');
const debug = require('debug');
const getincidents = require('./controllers/getIncidents');


// initialize express app
const app = express();
// view engine setup and public static directory
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.set('port', (process.env.PORT || 5000));
app.set('env', (process.env.NODE_ENV || 'development'));

// compress all routes
app.use(compression());


app.use('/', (req, res) => {
  console.log(req.headers.host);
  getincidents.GetAuthTokenandIncidents(req, res);
  res.render('index', {

  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stck trace
// To run in development mode set config var NODE_ENV to 'development'
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler. No stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.listen(app.get('port'), () => {
  debug.log('icconnect listening on port', app.get('port'));
});
