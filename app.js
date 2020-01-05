let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let pgSession = require('connect-pg-simple');
let db = require('./db.js');
let app = express();
let pg = require('pg');
let routes = require('./routes/root');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('cookie-parser')());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

process.env.DATABASE_URL = "postgres://postgres:123@127.0.0.1:5432/policestation";

app.use(session({
    store: new (require('connect-pg-simple')(session))(process.env.DATABASE_URL),
    secret: "Police",
    resave: false,
    cookie: {maxAge: 24 * 60 * 60 * 1000},
    saveUninitialized: false
}));

routes(app);

// error handler
app.use((err, req, res, next) => {
    if (err == 404) {
        res.render('./general/404');
    } else {
        res.render('./general/500');
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        res.end();
    }
});

module.exports = app;
