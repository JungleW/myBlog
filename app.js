var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

//日志功能
var fs = require('fs');
var accessLogfile = fs.createWriteStream('./logs/access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('./logs/error.log', {flags: 'a'});

var index = require('./routes/index'); 
var user = require('./routes/user');
var blog = require('./routes/blog');

// manager

var m_index = require('./routes/admin/index');
var m_user = require('./routes/admin/user');
var m_blog = require('./routes/admin/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//会话功能
app.use(session({
  secret: '12345',
  name: 'name',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(logger('dev', {stream: accessLogfile}));

app.use('/', index);
app.use('/home', index);
app.use('/user', user);
app.use('/blog', blog);

app.use('/admin', m_index);
app.use('/admin/index', m_index);
app.use('/admin/user', m_user);
app.use('/admin/blog', m_blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
        var meta = '[' + new Date() + ']' + req.url + '\n';
        console.log(meta + err.stack + '\n');
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
    var meta = '[' + new Date() + ']' + req.url + '\n';
    errorLogfile.write(meta + err.stack + '\n');
});



module.exports = app;
