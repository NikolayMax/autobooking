const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
require('./passport.config');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(expressSession({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(require('./routes'));
app.use(cookieParser());
app.use(function(err, req, res, next){
    res.status(500);
    res.send({
        error:'error',
        text:err
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
