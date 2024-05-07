var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index-router');
var personneRouter = require('./routes/personne-router');
var tarifRouter = require('./routes/tarif-router');
var legumeRouter = require('./routes/contrats/legume-router');

// Utilisation du module permettant de définir un nouveau dossier par défaut pour la favicon
var favicon = require('serve-favicon')
var path = require('path')

var app = express();

// Définition du dossier contenant la favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))

// port de connection au site web
const port = 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/personne', personneRouter);
app.use('/tarif', tarifRouter);
app.use('/contrat/legume', legumeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


