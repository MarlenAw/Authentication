const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator'); //to validate input fields if they are empty on the backend side

//Authentication Packages
const session = require('express-session');
const passport = require('passport');
const KnexSessionStore = require('connect-session-knex')(session);
const Knex = require('knex');
const knex = Knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'auth',
        password: 'mypassword',
        database: 'marlenauth'
    }
});

const store = new KnexSessionStore({
    knex: knex,
    tablename: 'sessions' // optional. Defaults to 'sessions'
});


const routes = require('./routes/index');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator()); //This line must be immediately after any of the bodyParser middlewares!

app.use(cookieParser());

app.engine('hbs', exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  })
);

app.set('port', process.env.PORT || 3002);
app.use(favicon(path.join(__dirname, '..', 'public', '/assets/favicon.ico')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
  secret: process.env.SECRET,
  cookie: {
        maxAge: 86400000  // one day
    },
  store: store,
  resave: false,
  saveUninitialized: false,
  // cookie: {secure: true}
}));


//make sure our passport integrates with express session
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
console.log('app.js after controllers');
module.exports = app;
