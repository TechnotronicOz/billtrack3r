var express     = require('express'),
    path        = require('path'),
    favicon     = require('static-favicon'),
    logger      = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser  = require('body-parser'),
    session     = require('express-session'),

    passport = require('passport'),
    LocalStrategy = require('passport-local'),

    db = require('./config/db'),
    pass = require('./config/passport'),

    routes = require('./routes/index'),
    user_routes = require('./routes/users'),
    app_routes = require('./routes/app'),
    bill_routes = require('./routes/bills'),

    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.session({ secret: 'dingd0ng' }));
app.use(session({ secret: 'secret', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
//app.use('/users', users);
app.use('/app', app_routes);
app.use('/bills', bill_routes);

// passport auth routes
app.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getlogin);
app.post('/login', user_routes.postlogin);
app.get('/admin', pass.ensureAuthenticated, /*pass.ensureAdmin(),*/ user_routes.admin);
app.get('/logout', user_routes.logout);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
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
});

var server = app.listen(3001, function() {
    console.log('Listening on port %d', server.address().port);
});


//module.exports = app;
