var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const assert = require('assert');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var companyRouter = require('./routes/company');
var panelRouter = require('./routes/panel');
var intervieweeRouter = require('./routes/interviewee');
var interviewRouter = require('./routes/interview');
const authenticate = require('./middleware/authenticate')
const WebSockets = require('./util/websockets')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',cors(), indexRouter);
// app.use(authenticate.verifyUser)
app.use('/users',cors(), usersRouter);
app.use('/company',cors(), companyRouter);
app.use('/panel',cors(), panelRouter);
app.use('/interviewee',cors(), intervieweeRouter);
app.use('/interview', interviewRouter);

app.use(cors())

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

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

module.exports = app;
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', WebSockets.default.connection);
app.set("socket",io);

module.exports = {app:app, server:server};
