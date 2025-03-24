const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const baseRouter = require('./routes/router');

// localhost port
const port = 5555;

// connect db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ABC240901@',
    database: '9014'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    
    console.log('Connected to database');
    });

global.db = db;

// view engine setup
app.set('port', process.env.port || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', baseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

module.exports = app;
