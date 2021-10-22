const createError = require('http-errors'); // Gerencia erros
const express = require('express'); 
const path = require('path');
const cors = require("cors"); // Controle de origem
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // Um plugin que automatiza logs
const mongoose = require("mongoose")

// Models
const User = require("./src/models/users");
const Recipe = require("./src/models/recipe");

// Routes
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var recipesRouter = require("./src/routes/recipes");

var app = express();

// Mongoose
mongoose.connect("SUA KEY AQUI"); // Não precisa ser o mongocloud(cloud.mongodb.com), você pode instalar o mongo, por exemplo...

// view engine setup - É uma view bem simples, só pra mostrar erros
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'jade');
// Permite requisição de qualquer fonte, deve ser usado com cuidado
app.use(cors({
  origin: function(origin, callback){
    return callback(null, true);
  }
}));

app.use(logger('common')); // Log apenas de coisas comuns. O dev é mais rico, mas não deve ser usado em produção
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/recipes', recipesRouter);

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
