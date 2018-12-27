const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('./db');

passport.serializeUser(function(user, done) {
    console.log('Серилизация: ', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Десерилизация: ', id);
    db.query('SELECT * from auto_admin.users WHERE id = ?', [id])
        .then(function(user){
            done(null, user?user:false);
        })
});
passport.use(new LocalStrategy({usernameField:'phone'},function(phone, password, done) {
        db.query('SELECT * from auto_admin.users WHERE phone = ? && password = ?', [phone,password])
            .then(function(user){
                if(user.length == 1)
                    user = user[0];
                else
                    user = false;
                done(null, user);
            })
            .catch(function(){
                done(null, false);
            });
    }
));