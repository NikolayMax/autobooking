const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./passport.config');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({secret: 'SECRET'}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST,GET');
    res.set('Access-Control-Allow-Headers', '*');
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
