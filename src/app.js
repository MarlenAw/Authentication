const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator'); //to validate input fields if they are empty on the backend side


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
app.use(routes);
console.log('app.js after controllers');
module.exports = app;
