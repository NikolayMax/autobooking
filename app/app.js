const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const RedisStore = require('connect-redis')(session);
require('./passport.config');

var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(session({
    store: new RedisStore(),
    name:'session',
    cookie: { secure: false, maxAge:86400000 },
    secret: 'sessionmaxageset'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.set('Access-Control-Allow-Methods', '*');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, accept, content-type');
    next();
});
app.use(require('./routes'));
app.use(function(err, req, res, next){
    res.status(500);
    console.log(err)
    res.send({
        error:'error',
        text:err
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
