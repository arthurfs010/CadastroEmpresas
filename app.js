var mysql = require('mysql');
var connection = require('express-myconnection');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var index = require('./routes/index');
var cadastroEmpresa = require('./routes/cadastroEmpresa');
var inicio = require('./routes/inicio');

var flash = require('connect-flash');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Função que faz a conexão ao banco de dados
app.use(
  connection(mysql, {
    host: '192.168.25.26',
    user: 'root',
    password: 'bv1020',
    port: 3306,
    database: 'buscavaga',
    multipleStatements: true
  }, 'request')
);

app.use(session({
                  secret: 'woot',
                  resave: true,
                  saveUninitialized: true}));
app.use(flash());
app.use('/', index);
app.use('/cadastroEmpresa', cadastroEmpresa);
app.use('/inicio', inicio);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('Servico inicializado utilizando a porta: %s', port)
});

module.exports = app;
